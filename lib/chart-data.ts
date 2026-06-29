export const chartProgram = {
  conference: "第8回 日本在宅医療連合学会大会",
  subtitle: "チームで創る退院支援 カンファレンス・シミュレーション",
  organizer: "企画：ななーる訪問看護ディベロップメントセンター",
  notice: "このページはシミュレーション用に作成した架空のカルテです。実在の患者情報ではありません。"
};

export const chartPatient = {
  hospital: "JAHCM病院",
  ward: "2D病棟",
  department: "脳神経内科",
  conferenceAt: "2026年7月4日 13:30",
  conferenceAtShort: "2026/07/04 13:30",
  conferencePoint: "2026/07/04 13:30",
  admissionDate: "2026年6月25日",
  admissionDateShort: "2026/06/25",
  admissionPurpose: "誤嚥性肺炎の治療および退院前カンファレンスによる在宅移行方針の検討",
  id: "JAHCM-2D-0004",
  name: "佐藤 由紀",
  age: "72歳",
  sex: "女性",
  diagnosis: "筋萎縮性側索硬化症（上肢型）",
  admissionReason: "誤嚥性肺炎",
  diet: "きざみ食，水分とろみ"
};

export const conferenceNotice =
  "本カルテは2026年7月4日 13:30の退院前カンファレンス時点の情報です。";

export const chartNavItems = [
  { href: "/chart/profile", label: "基本情報", description: "患者情報・ADL/IADL・入院までの経緯" },
  { href: "/chart/vitals", label: "熱型表", description: "体温・脈拍・血圧・観察項目・看護備考" },
  { href: "/chart/labs", label: "検査データ", description: "日付別の採血結果と基準範囲" },
  { href: "/chart/rehab", label: "リハ記録", description: "PT・OT・STの評価，所見，方針" },
  { href: "/chart/nursing-notes", label: "看護記録", description: "本人・家族・院内カンファレンス記録" },
  { href: "/chart/doctor-notes", label: "医師記録", description: "治療経過と処方・指示" }
] as const;

export const patientSummary = [
  ["病院名", chartPatient.hospital],
  ["病棟", chartPatient.ward],
  ["診療科", chartPatient.department],
  ["患者ID", chartPatient.id],
  ["氏名", chartPatient.name],
  ["年齢", chartPatient.age],
  ["性別", chartPatient.sex],
  ["主病名", chartPatient.diagnosis],
  ["入院理由", chartPatient.admissionReason],
  ["入院日", chartPatient.admissionDate]
] as const;

export const vitals = [
  {
    day: "1日目",
    date: "2026/06/25",
    shortDate: "6/25",
    slots: [
      { time: "18:30", temperature: 38.2, bp: "138/78", systolic: 138, diastolic: 78, pulse: 104, respiration: 24, spo2: "93%", oxygen: "NC 1L" },
      { time: "21:00", temperature: 38.5, bp: "136/76", systolic: 136, diastolic: 76, pulse: 106, respiration: 24, spo2: "94%", oxygen: "NC 1L" }
    ],
    meals: { morning: "0/0", noon: "2/2", evening: "2/1" }
  },
  {
    day: "2日目",
    date: "2026/06/26",
    shortDate: "6/26",
    slots: [
      { time: "06:00", temperature: 37.8, bp: "132/74", systolic: 132, diastolic: 74, pulse: 98, respiration: 22, spo2: "94%", oxygen: "NC 1L" },
      { time: "12:00", temperature: 37.6, bp: "130/72", systolic: 130, diastolic: 72, pulse: 96, respiration: 22, spo2: "94%", oxygen: "NC 1L" },
      { time: "18:00", temperature: 37.4, bp: "128/70", systolic: 128, diastolic: 70, pulse: 94, respiration: 20, spo2: "95%", oxygen: "NC 1L" },
      { time: "22:00", temperature: 37.3, bp: "126/70", systolic: 126, diastolic: 70, pulse: 92, respiration: 20, spo2: "95%", oxygen: "NC 1L" }
    ],
    meals: { morning: "3/2", noon: "3/3", evening: "3/3" }
  },
  {
    day: "3日目",
    date: "2026/06/27",
    shortDate: "6/27",
    slots: [
      { time: "06:00", temperature: 37.2, bp: "128/72", systolic: 128, diastolic: 72, pulse: 90, respiration: 20, spo2: "95%", oxygen: "RA" },
      { time: "14:00", temperature: 37.0, bp: "126/70", systolic: 126, diastolic: 70, pulse: 88, respiration: 20, spo2: "95%", oxygen: "RA" },
      { time: "21:00", temperature: 37.4, bp: "128/72", systolic: 128, diastolic: 72, pulse: 92, respiration: 20, spo2: "95%", oxygen: "RA" }
    ],
    meals: { morning: "4/3", noon: "4/4", evening: "4/3" }
  },
  {
    day: "4日目",
    date: "2026/06/28",
    shortDate: "6/28",
    slots: [
      { time: "06:00", temperature: 37.1, bp: "126/70", systolic: 126, diastolic: 70, pulse: 88, respiration: 20, spo2: "95%", oxygen: "RA" },
      { time: "14:00", temperature: 36.9, bp: "124/68", systolic: 124, diastolic: 68, pulse: 86, respiration: 18, spo2: "96%", oxygen: "RA" },
      { time: "20:00", temperature: 36.9, bp: "124/70", systolic: 124, diastolic: 70, pulse: 86, respiration: 18, spo2: "96%", oxygen: "RA" }
    ],
    meals: { morning: "5/4", noon: "5/5", evening: "5/4" }
  },
  {
    day: "5日目",
    date: "2026/06/29",
    shortDate: "6/29",
    slots: [
      { time: "06:00", temperature: 36.9, bp: "124/68", systolic: 124, diastolic: 68, pulse: 84, respiration: 18, spo2: "96%", oxygen: "RA" },
      { time: "18:00", temperature: 36.8, bp: "122/70", systolic: 122, diastolic: 70, pulse: 82, respiration: 18, spo2: "96%", oxygen: "RA" }
    ],
    meals: { morning: "5/5", noon: "6/5", evening: "5/5" }
  },
  {
    day: "6日目",
    date: "2026/06/30",
    shortDate: "6/30",
    slots: [
      { time: "06:00", temperature: 36.8, bp: "122/70", systolic: 122, diastolic: 70, pulse: 82, respiration: 18, spo2: "96%", oxygen: "RA" },
      { time: "18:00", temperature: 36.7, bp: "122/68", systolic: 122, diastolic: 68, pulse: 80, respiration: 18, spo2: "96%", oxygen: "RA" }
    ],
    meals: { morning: "6/5", noon: "6/6", evening: "6/5" }
  },
  {
    day: "7日目",
    date: "2026/07/01",
    shortDate: "7/1",
    slots: [
      { time: "06:00", temperature: 36.7, bp: "124/72", systolic: 124, diastolic: 72, pulse: 80, respiration: 18, spo2: "96%", oxygen: "RA" },
      { time: "18:00", temperature: 36.6, bp: "122/70", systolic: 122, diastolic: 70, pulse: 80, respiration: 18, spo2: "96%", oxygen: "RA" }
    ],
    meals: { morning: "6/5", noon: "6/6", evening: "6/6" }
  },
  {
    day: "8日目",
    date: "2026/07/02",
    shortDate: "7/2",
    slots: [
      { time: "06:00", temperature: 36.6, bp: "120/68", systolic: 120, diastolic: 68, pulse: 78, respiration: 18, spo2: "96%", oxygen: "RA" },
      { time: "18:00", temperature: 36.6, bp: "120/70", systolic: 120, diastolic: 70, pulse: 78, respiration: 18, spo2: "96%", oxygen: "RA" }
    ],
    meals: { morning: "6/6", noon: "7/6", evening: "6/6" }
  },
  {
    day: "9日目",
    date: "2026/07/03",
    shortDate: "7/3",
    slots: [
      { time: "06:00", temperature: 36.7, bp: "122/70", systolic: 122, diastolic: 70, pulse: 82, respiration: 18, spo2: "95%", oxygen: "RA" },
      { time: "18:00", temperature: 36.7, bp: "122/70", systolic: 122, diastolic: 70, pulse: 80, respiration: 18, spo2: "96%", oxygen: "RA" },
      { time: "22:40", temperature: 36.8, bp: "124/72", systolic: 124, diastolic: 72, pulse: 84, respiration: 18, spo2: "95%", oxygen: "RA" }
    ],
    meals: { morning: "6/5", noon: "6/6", evening: "6/5" }
  },
  {
    day: "10日目",
    date: "2026/07/04",
    shortDate: "7/4",
    slots: [
      { time: "06:00", temperature: 36.6, bp: "120/70", systolic: 120, diastolic: 70, pulse: 78, respiration: 18, spo2: "96%", oxygen: "RA" },
      { time: "09:00", temperature: 36.6, bp: "120/70", systolic: 120, diastolic: 70, pulse: 78, respiration: 18, spo2: "96%", oxygen: "RA" }
    ],
    meals: { morning: "6/6", noon: "7/6", evening: "6/6" }
  }
] as const;

export const nursingRemarks = [
  { date: "2026/06/25", time: "10:00", body: "緊急入院。" },
  { date: "2026/06/25", time: "19:20", body: "38.2℃。咳嗽・喀痰あり。医師指示にて解熱鎮痛薬使用。" },
  { date: "2026/06/26", time: "06:40", body: "夜間，痰が絡む訴えあり。体位調整で軽快。" },
  { date: "2026/06/27", time: "21:10", body: "痰が絡む感じでナースコールあり。SpO2 95％。呼吸苦は軽度。" },
  { date: "2026/06/29", time: "12:40", body: "昼食後半に疲労感あり。食事時間40分程度。" },
  { date: "2026/07/01", time: "16:00", body: "長女面会あり。退院後の生活について「父と協力したい」と話される。" },
  { date: "2026/07/03", time: "22:40", body: "夜間，痰が絡む感じで覚醒。体位調整と飲水介助で落ち着く。" }
] as const;

export const labs = [
  { item: "WBC", range: "3,300-8,600", first: "12,800", latest: "6,900", unit: "/μL", firstFlag: "high", latestFlag: "normal" },
  { item: "Neut", range: "40-75", first: "84", latest: "68", unit: "%", firstFlag: "high", latestFlag: "normal" },
  { item: "Hb", range: "11.6-14.8", first: "11.8", latest: "11.5", unit: "g/dL", firstFlag: "normal", latestFlag: "low" },
  { item: "Plt", range: "15.8-34.8", first: "24.8", latest: "27.5", unit: "万/μL", firstFlag: "normal", latestFlag: "normal" },
  { item: "CRP", range: "0.00-0.14", first: "8.6", latest: "0.9", unit: "mg/dL", firstFlag: "high", latestFlag: "high" },
  { item: "TP", range: "6.6-8.1", first: "6.5", latest: "6.2", unit: "g/dL", firstFlag: "low", latestFlag: "low" },
  { item: "Alb", range: "4.1-5.1", first: "3.4", latest: "3.2", unit: "g/dL", firstFlag: "low", latestFlag: "low" },
  { item: "AST", range: "13-30", first: "24", latest: "22", unit: "U/L", firstFlag: "normal", latestFlag: "normal" },
  { item: "ALT", range: "7-23", first: "18", latest: "17", unit: "U/L", firstFlag: "normal", latestFlag: "normal" },
  { item: "BUN", range: "8-20", first: "18", latest: "21", unit: "mg/dL", firstFlag: "normal", latestFlag: "high" },
  { item: "Cr", range: "0.46-0.79", first: "0.68", latest: "0.70", unit: "mg/dL", firstFlag: "normal", latestFlag: "normal" },
  { item: "Na", range: "138-145", first: "139", latest: "140", unit: "mEq/L", firstFlag: "normal", latestFlag: "normal" },
  { item: "K", range: "3.6-4.8", first: "4.1", latest: "4.0", unit: "mEq/L", firstFlag: "normal", latestFlag: "normal" },
  { item: "Cl", range: "101-108", first: "103", latest: "104", unit: "mEq/L", firstFlag: "normal", latestFlag: "normal" },
  { item: "Glu", range: "73-109", first: "118", latest: "104", unit: "mg/dL", firstFlag: "high", latestFlag: "normal" }
] as const;

export const profileRows = [
  ["患者ID", chartPatient.id],
  ["氏名", chartPatient.name],
  ["年齢", chartPatient.age],
  ["性別", chartPatient.sex],
  ["病棟", chartPatient.ward],
  ["診療科", chartPatient.department],
  ["主病名", chartPatient.diagnosis],
  ["入院理由", chartPatient.admissionReason],
  ["入院日", chartPatient.admissionDate],
  ["同居家族", "夫，74歳"],
  ["キーパーソン", "長女，45歳，近隣在住"],
  ["住居", "築35年の戸建て，寝室は1階"]
] as const;

export const adlRows = [
  ["移動", "屋内はゆっくりであれば自立。疲労時は不安定。"],
  ["食事", "上肢機能低下により介助を要する場面あり。"],
  ["更衣", "時間を要し，一部介助が必要。"],
  ["トイレ", "病棟では見守り程度。自宅環境での評価は未実施。"],
  ["入浴", "詳細未確認。"],
  ["コミュニケーション", "発声可能。疲労時に聞き取りにくさあり。"]
] as const;

export const iadlRows = [
  ["調理", "本人は困難。主に夫が対応。"],
  ["掃除・洗濯", "詳細未確認。夫の支援あり。"],
  ["買い物", "詳細未確認。"],
  ["服薬管理", "詳細未確認。"],
  ["外出", "疲労しやすく，最近は活動量低下。"],
  ["家事全般", "上肢機能低下により困難が増えている。"]
] as const;

export const admissionHistory = [
  "佐藤由紀さんは2年前に筋萎縮性側索硬化症（上肢型）と診断された。発症後から徐々に上肢の筋力低下が進行し，ここ1年ほどは箸の操作や細かな家事が難しくなっていた。半年ほど前からは，食事動作に夫の部分的な介助が必要となり，更衣にも時間を要するようになっていた。歩行はゆっくりであれば自立していたが，疲れやすさが目立っていた。",
  "ここ1か月は食事中のむせが増え，食後の湿性咳嗽がしばしばみられていた。痰が切れにくく，食事に時間がかかることも増えていた。入院約2週間前から食事摂取量が低下し，疲れやすさと咳が増強した。2026年6月25日の夕食時，強いむせ込みと呼吸困難が出現し，長女が救急要請した。JAHCM病院に搬送され，誤嚥性肺炎と診断され入院となった。"
] as const;

export const rehabSections = [
  {
    title: "PT記録　2026/07/01 10:00",
    fields: [
      ["評価場面", "病棟内歩行，トイレ移動，方向転換，立ち上がり動作を確認。"],
      ["所見", "ベッドからの起き上がりは時間を要するが，見守りで可能。立ち上がりは手すり使用で可能。病棟内短距離歩行はゆっくりであれば自立〜見守りレベル。歩幅は小さく，方向転換時にふらつきあり。疲労時には歩行速度が低下し，姿勢がやや前傾となる。"],
      ["評価", "病棟環境では短距離移動は概ね可能。ただし，方向転換，狭い場所での移動，夜間移動では転倒リスクが上がる可能性あり。自宅内の廊下幅，トイレ動線，寝室から居間までの移動経路，手すりの有無について確認が必要。"],
      ["方針", "病棟内での離床機会を確保し，疲労に注意しながら歩行状態を確認する。自宅環境の情報が得られ次第，移動方法，手すり，歩行補助具，家具配置などを検討する。"]
    ]
  },
  {
    title: "OT記録　2026/07/01 11:00",
    fields: [
      ["評価場面", "食事動作，更衣動作，整容動作，上肢操作を確認。"],
      ["所見", "上肢機能低下あり。箸操作は困難で，スプーン使用でも食器の位置調整が必要。コップ保持は不安定で，疲労時にこぼしやすい。更衣は上衣の着脱に時間を要し，袖を通す動作で介助を要する。ボタン操作や細かな手作業は困難。整容動作にも時間を要する。"],
      ["評価", "食事，更衣，整容は，病棟では一部介助により実施可能。ただし，退院後は家族の介助量が増える可能性がある。食事動作は疲労の影響を受けやすく，食器，自助具，姿勢，介助方法の調整が必要。トイレ動作は環境により介助量が変わる可能性あり。"],
      ["方針", "食器配置，自助具，椅子・テーブル高さ，衣類の選択について評価を継続する。自宅環境と家族の介助状況を確認し，必要に応じてADL動作の方法を検討する。"]
    ]
  },
  {
    title: "ST記録　2026/06/29 14:00",
    fields: [
      ["評価場面", "発声・構音，嚥下状態，食事場面を確認。"],
      ["所見", "発声は可能。構音はやや不明瞭で，疲労時に聞き取りにくさが増す。とろみ水分ではむせ込み少ない。きざみ食で経口摂取可能。食事時間は長く，後半に疲労がみられる。食後に軽い湿性咳嗽あり。"],
      ["評価", "現時点では，きざみ食・とろみ水分で経口摂取継続は可能。ただし，食事時間の延長，疲労，湿性咳嗽があり，誤嚥再発リスクに注意が必要。ALSの進行に伴い，嚥下機能やコミュニケーション能力は変化する可能性がある。"],
      ["方針", "食形態はきざみ食，水分とろみで継続。食事姿勢，食事時間，介助方法，疲労時のコミュニケーション方法について確認を継続する。"]
    ]
  }
] as const;

export const nursingNotes = [
  {
    title: "看護記録1　2026/06/25 21:00",
    soap: {
      S: "本人より「食事のときにむせることが増えていました。今日は息が苦しくなって怖かったです」と発言あり。長女より「最近，食事に時間がかかっていて，咳も増えていました。今日はかなり苦しそうだったので救急車を呼びました」と情報あり。夫は付き添い時，「家では何とかやっていました」と話す。",
      O: "救急搬送後，誤嚥性肺炎の診断で2D病棟入院。BT 38.2℃，SpO2 93％，鼻カヌラ1L。湿性咳嗽，喀痰あり。上肢筋力低下あり，ナースコール操作や飲水動作に時間を要する。発声は可能だが，疲労時に発話がやや不明瞭。夫，長女が来院し，入院時説明を受ける。",
      A: "ALSに伴う嚥下機能低下を背景に誤嚥性肺炎を発症した可能性がある。発熱，喀痰，酸素化低下があり，呼吸状態の観察が必要。上肢機能低下により，食事，飲水，ナースコール，体位調整などで援助を要する。入院前から食事時間延長やむせが増えており，退院後の食事支援と家族の介助状況の確認が必要。\n\n看護問題：\n#1 誤嚥性肺炎に伴う呼吸状態悪化リスク\n#2 ALS進行に伴う嚥下機能低下と日常生活動作への援助ニーズ",
      P: "呼吸状態，SpO2，喀痰，発熱を観察する。食事再開時は嚥下状態を確認し，ST評価につなげる。上肢機能低下に配慮し，ナースコールや飲水，体位調整を援助する。本人・夫・長女から入院前の生活状況と介助状況を継続して確認する。"
    }
  },
  {
    title: "看護記録2　2026/06/30 10:30",
    soap: {
      S: "更衣介助後，本人より「前より手が動かなくなってきた気がします」と発言あり。上衣の着脱に時間を要したことについて話すと，「家でも夫に手伝ってもらっていました。最近は食事も時間がかかって……」と話す。退院後の生活について確認すると，「家に帰れたらいいとは思います」と話す一方で，「でも，夫に何でもしてもらうのは申し訳ないです」と発言あり。夜間の様子を尋ねると，「痰が絡む感じがして眠れないことがありました。でも，夜に夫を起こすのは悪いので，少し我慢していました」と話す。長女に同じことを話せるか確認すると，「娘には心配をかけたくないので……」と話し，その後は発言少なくなる。",
      O: "更衣時，上衣の着脱に介助を要する。袖を通す動作に時間を要し，動作後に疲労感あり。会話は可能だが，長く話すと発話がやや不明瞭となる。夫や長女の話題になると声量が小さくなり，発言が短くなる。表情は硬い。夜間は痰の絡みでナースコールが数回あり，体位調整や飲水介助で落ち着いている。",
      A: "本人は在宅生活を否定してはいないが，夫への負担を強く気にしている。夜間の痰の絡みや不安があり，自宅では夫への遠慮から症状を十分に伝えていなかった可能性がある。家族の前では不安や希望を十分に表出しにくい可能性があるため，本人の意向確認は家族同席場面だけでは不十分となる可能性がある。",
      P: "本人が話しやすい場面で，退院後の生活への希望や不安を継続して確認する。退院前カンファレンスでは，本人の発言が家族の意向に埋もれないよう留意する。夜間の痰，呼吸不安，睡眠状況について，退院後の対応方法と相談先を多職種で確認する。"
    }
  },
  {
    title: "看護記録3　2026/07/01 14:00　院内カンファレンス記録",
    conference: {
      members: "病棟看護師，主治医，退院支援看護師，PT，OT，ST",
      record:
        "抗菌薬治療により発熱，咳嗽，炎症反応は改善傾向。主治医より，肺炎は軽快傾向であり，医学的には退院検討可能な状態との見解あり。STより，きざみ食，水分とろみで経口摂取は可能だが，食事時間の延長と疲労，食後の湿性咳嗽に注意が必要との報告あり。PT・OTより，病棟内短距離歩行は可能だが，上肢機能低下により食事，更衣，整容で介助を要する場面があり，自宅環境と家族の介助力の確認が必要との報告あり。",
      plan:
        "退院前カンファレンスを2026/07/04 13:30に実施予定。訪問看護と在宅医の導入を検討する。PT・OTによる退院後の生活場面評価も必要。福祉用具や自宅環境調整については，家族の意向と支援可能量を確認したうえで検討する。本人，夫，長女の意向と認識に差がないか，退院前カンファレンスで確認する。"
    }
  },
  {
    title: "看護記録4　2026/07/03 15:20",
    soap: {
      S: "夫と長女が面会。退院後の生活について確認すると，夫は「これまでも二人でやってきましたので，家でも何とかなると思います」と話す。食事介助については「時間はかかりますが，ゆっくりやれば大丈夫です」と話す。夜間の対応について確認すると，「まあ，起きることはありますが，仕方ないです」と話す。腰痛や体調については「大したことはありません」と話す。長女は「父と協力して在宅で支えていきたいです。訪問看護さんも入るなら，何とかなると思います」と話す。平日の支援について確認すると，「仕事があるので毎日は難しいですが，必要なときには行くつもりです」と話す。夜間対応については「そこは父がいるので……」と話される。本人は家族の発言中，うなずきあり。ただし，自ら困りごとを話す様子は少ない。夫の「何とかなると思います」という発言時，本人はうつむく様子あり。",
      O: "夫は穏やかに受け答えされるが，「大丈夫」「何とか」という表現が多い。具体的な介助量，夜間対応の頻度，夫自身の休息状況については詳細確認に至らず。長女は在宅療養に前向きだが，来訪頻度，滞在時間，平日の支援可能性は明確ではない。本人は家族の前では発言が少なく，表情はやや硬い。",
      A: "家族は在宅療養に前向きな姿勢を示しているが，実際の介助量や支援可能量は十分に把握できていない。長女は訪問看護導入により在宅療養が成立すると考えている可能性がある。夫の「大丈夫」という発言のみで介護負担を判断することは難しい。本人の不安や夫の介護負担が家族間で十分共有されていない可能性がある。",
      P: "退院前カンファレンスで，夫の食事介助，更衣介助，夜間対応，体調面を具体的に確認する。長女には支援可能な曜日，時間帯，具体的に担える内容を確認する。必要時，本人，夫，長女それぞれに分けて話を聞く機会を検討する。"
    }
  }
] as const;

export const doctorNotes = [
  {
    title: "医師記録1　2026/06/25 18:30",
    soap: {
      S: "夕食時に強いむせ込みがあり，その後から咳嗽，喀痰，呼吸苦が出現したとのこと。長女が救急要請。本人は「食事中にむせることが増えていた」と話す。",
      O: "BT 38.2℃，BP 138/78 mmHg，HR 104/min，RR 24/min，SpO2 93％。鼻カヌラ1Lで管理。湿性咳嗽あり。WBC 12,800/μL，Neut 84％，CRP 8.6 mg/dL。胸部所見より誤嚥性肺炎として矛盾しない。",
      A: "ALSに伴う嚥下機能低下を背景とした誤嚥性肺炎と考える。酸素需要は軽度だが，発熱，喀痰，炎症反応上昇を認め，抗菌薬治療を要する。",
      P: "誤嚥性肺炎に対して抗菌薬治療を開始する。酸素投与，補液，解熱鎮痛薬を適宜使用。嚥下状態についてST評価を依頼する。"
    },
    orders: [
      "セフトリアキソン 2g 1日1回 点滴開始",
      "酸素 鼻カヌラ1L，SpO2 94％以上を目安に調整",
      "発熱時，解熱鎮痛薬使用可",
      "嚥下評価まで食形態は病棟判断で慎重に調整"
    ]
  },
  {
    title: "医師記録2　2026/06/29 09:30",
    soap: {
      S: "本人は「咳は少し楽になりました。食事は時間がかかります」と話す。呼吸苦の訴えは明らかではない。",
      O: "BT 36.9℃，BP 124/68 mmHg，HR 84/min，RR 18/min，SpO2 96％，室内気。咳嗽・喀痰は軽減。WBC 7,900/μL，CRP 2.1 mg/dL。食事摂取は5〜6割程度。ST評価では，きざみ食・とろみ水分で経口摂取可能と判断。",
      A: "誤嚥性肺炎は抗菌薬治療に反応し改善傾向。酸素投与は不要となっており，発熱も改善している。嚥下機能低下は残存しており，食事時のむせ・湿性咳嗽には注意を要する。",
      P: "抗菌薬は継続し，計7日間で終了予定とする。現時点では2026/07/01で終了予定。食形態はきざみ食，水分とろみで継続。食事時のむせ，湿性咳嗽，発熱再燃の有無を観察する。"
    },
    orders: [
      "セフトリアキソン 2g 1日1回 点滴継続",
      "抗菌薬は2026/07/01終了予定",
      "酸素投与は中止，室内気で経過観察",
      "食事はきざみ食，水分とろみ",
      "PT・OT・ST評価継続"
    ]
  },
  {
    title: "医師記録3　2026/07/04 09:00",
    soap: {
      S: "本人は「咳はだいぶ落ち着いています」と話す。呼吸苦の訴えなし。食事は「時間はかかるが，少しずつ食べられる」と話す。",
      O: "BT 36.6℃，BP 120/70 mmHg，HR 78/min，RR 18/min，SpO2 96％，室内気。抗菌薬は2026/07/01に終了。終了後も再発熱なし。WBC 6,900/μL，CRP 0.9 mg/dL，Alb 3.2 g/dL，Cr 0.70 mg/dL。呼吸状態は安定。ST評価では，きざみ食・とろみ水分で経口摂取継続可能。",
      A: "誤嚥性肺炎は軽快。抗菌薬終了後も再発熱なく，酸素化も安定している。医学的には退院検討可能な状態。ALSに伴う嚥下機能低下は残存しており，誤嚥再発には注意を要する。",
      P: "本日13:30に退院前カンファレンスを実施予定。医学的には退院検討可能であることを共有する。退院後も食形態はきざみ食，水分とろみを継続し，発熱，咳嗽増悪，喀痰増加，呼吸苦出現時には早めに医療機関へ相談する方針とする。"
    },
    orders: [
      "抗菌薬は2026/07/01終了済み",
      "食事はきざみ食，水分とろみ継続",
      "発熱，咳嗽増悪，喀痰増加，呼吸苦出現時は医療機関へ相談",
      "本日13:30に退院前カンファレンス予定"
    ]
  }
] as const;
