import postgres from "postgres";
import { randomUUID } from "node:crypto";

export type Submission = {
  id: string;
  group_number: number;
  image_url: string;
  image_url_2: string | null;
  note: string | null;
  created_at: Date;
  updated_at: Date;
  is_hidden: boolean;
};

export type Comment = {
  id: string;
  submission_id: string;
  commenter_name: string;
  profession: string;
  profession_other: string | null;
  body: string;
  created_at: Date;
  is_hidden: boolean;
};

export type BoardGroup = {
  groupNumber: number;
  submission: Submission | null;
  comments: Comment[];
};

let client: ReturnType<typeof postgres> | null = null;

function sql() {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    throw new Error("POSTGRES_URL is not set.");
  }

  client ??= postgres(url, {
    ssl: "require",
    max: 1
  });
  return client;
}

export async function ensureTables() {
  const db = sql();
  await db`
    create table if not exists submissions (
      id text primary key,
      group_number integer not null check (group_number between 1 and 8),
      image_url text not null,
      image_url_2 text,
      note text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      is_hidden boolean not null default false
    )
  `;
  await db`
    alter table submissions
    add column if not exists image_url_2 text
  `;
  await db`
    alter table submissions
    drop constraint if exists submissions_group_number_check
  `;
  await db`
    alter table submissions
    add constraint submissions_group_number_check
    check (group_number between 1 and 8)
  `;
  await db`
    create table if not exists comments (
      id text primary key,
      submission_id text not null references submissions(id) on delete cascade,
      commenter_name text not null,
      profession text not null,
      profession_other text,
      body text not null check (char_length(body) <= 200),
      created_at timestamptz not null default now(),
      is_hidden boolean not null default false
    )
  `;
  await db`
    create index if not exists submissions_group_created_idx
      on submissions (group_number, created_at desc)
  `;
  await db`
    create index if not exists comments_submission_created_idx
      on comments (submission_id, created_at asc)
  `;
}

export async function createSubmission(input: {
  groupNumber: number;
  imageUrls: string[];
  note: string;
}) {
  await ensureTables();
  const rows = await sql()<Submission[]>`
    insert into submissions (id, group_number, image_url, image_url_2, note)
    values (
      ${randomUUID()},
      ${input.groupNumber},
      ${input.imageUrls[0]},
      ${input.imageUrls[1] || null},
      ${input.note || null}
    )
    returning *
  `;
  return rows[0];
}

export async function createComment(input: {
  submissionId: string;
  commenterName: string;
  profession: string;
  professionOther: string;
  body: string;
}) {
  await ensureTables();
  const rows = await sql()<Comment[]>`
    insert into comments (
      id,
      submission_id,
      commenter_name,
      profession,
      profession_other,
      body
    )
    values (
      ${randomUUID()},
      ${input.submissionId},
      ${input.commenterName},
      ${input.profession},
      ${input.professionOther || null},
      ${input.body}
    )
    returning *
  `;
  return rows[0];
}

export async function getLatestVisibleSubmissions() {
  await ensureTables();
  return sql()<Submission[]>`
    select distinct on (group_number) *
    from submissions
    where is_hidden = false
    order by group_number, created_at desc
  `;
}

export async function getVisibleComments(submissionIds: string[]) {
  if (submissionIds.length === 0) {
    return [];
  }

  await ensureTables();
  return sql()<Comment[]>`
    select *
    from comments
    where is_hidden = false
      and submission_id in ${sql()(submissionIds)}
    order by created_at asc
  `;
}

export async function getBoardGroups(groupNumbers: readonly number[]) {
  const submissions = await getLatestVisibleSubmissions();
  const comments = await getVisibleComments(submissions.map((item) => item.id));

  return groupNumbers.map<BoardGroup>((groupNumber) => {
    const submission =
      submissions.find((item) => item.group_number === groupNumber) || null;
    return {
      groupNumber,
      submission,
      comments: submission
        ? comments.filter((comment) => comment.submission_id === submission.id)
        : []
    };
  });
}

export async function getAdminData() {
  await ensureTables();
  const submissions = await sql()<Submission[]>`
    select *
    from submissions
    order by created_at desc
  `;
  const comments = await sql()<Comment[]>`
    select *
    from comments
    order by created_at desc
  `;
  return { submissions, comments };
}

export async function setSubmissionHidden(id: string, hidden: boolean) {
  await ensureTables();
  await sql()`update submissions set is_hidden = ${hidden} where id = ${id}`;
}

export async function deleteSubmission(id: string) {
  await ensureTables();
  await sql()`delete from submissions where id = ${id}`;
}

export async function setCommentHidden(id: string, hidden: boolean) {
  await ensureTables();
  await sql()`update comments set is_hidden = ${hidden} where id = ${id}`;
}

export async function deleteComment(id: string) {
  await ensureTables();
  await sql()`delete from comments where id = ${id}`;
}
