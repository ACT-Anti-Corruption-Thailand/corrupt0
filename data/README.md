# Data

Folder นี้เอาไว้เก็บข้อมูลดิบ + Script ที่ใช้ transform ข้อมูลเหล่านั้น

## Fetch

ดึงข้อมูลด้วยคำสั่ง

```bash
pnpm fetch
```

ข้อมูลที่ fetch มาแล้วจะอยู่ใน `/data/raw`

> **Note**
>
> ข้อมูลที่ดึงด้วยมือมา (ไม่ได้ใช้คำสั่ง fetch) ให้ใส่ไว้ใน `/data/constants`

## Process

Process ข้อมูลด้วยคำสั่ง

```bash
pnpm process
```

- ถ้าข้อมูลที่ process เป็น constant ต่างๆ (เช่น รายชื่อนักการเมือง) ให้ใส่ไว้ที่ `/src/data`
- แต่ถ้าเป็นไฟล์เฉพาะหน้า (tailored made) ให้ใส่ไว้ใน `/src/data/info`

## Data Directory

### ข้อมูลบัญชีทรัพสินและหนี้สิน nacc

```md
- nacc.csv
- co003_opendata_path.json
  - asset.csv
  - asset_acquisition_type.csv
  - asset_building_info.csv
  - asset_land_info.csv
  - asset_other_asset_info.csv
  - asset_type.csv
  - asset_vehicle_info.csv
  - date_acquiring_type.csv
  - date_ending_type.csv
  - nacc_detail.csv
  - position_period_type.csv
  - relationship.csv
  - relative_info.csv
  - spouse_info.csv
  - spouse_old_name.csv
  - spouse_position.csv
  - statement.csv
  - statement_detail.csv
  - statement_detail_type.csv
  - statement_type.csv
  - submitter_info.csv
  - submitter_old_name.csv
  - submitter_position.csv
```

### คำชี้มูลปปช. nacc_culpability

```md
- nacc_culpability.csv
```

### บริจาคพรรคการเมือง ect

```md
- ect.csv
- co004_opendata_path.json
  - donation.csv
  - donation_type.csv
  - donor.csv
  - ect_detail.csv
  - party.csv
```

### การบังคับใช้กฎหมายของกลต sec

```md
- sec.csv
```

### ds002 — Company & Commitee Share Holder

```md
- ds002_opendata_path.json
  - commitee_shareholder_split_0.csv
  - commitee_shareholder_split_1.csv
  - commitee_shareholder_split_10.csv
  - commitee_shareholder_split_11.csv
  - commitee_shareholder_split_12.csv
  - commitee_shareholder_split_13.csv
  - commitee_shareholder_split_2.csv
  - commitee_shareholder_split_3.csv
  - commitee_shareholder_split_4.csv
  - commitee_shareholder_split_5.csv
  - commitee_shareholder_split_6.csv
  - commitee_shareholder_split_7.csv
  - commitee_shareholder_split_8.csv
  - commitee_shareholder_split_9.csv
  - act_company_split_0.csv
  - act_company_split_1.csv
  - act_company_split_10.csv
  - act_company_split_11.csv
  - act_company_split_12.csv
  - act_company_split_13.csv
  - act_company_split_2.csv
  - act_company_split_3.csv
  - act_company_split_4.csv
  - act_company_split_5.csv
  - act_company_split_6.csv
  - act_company_split_7.csv
  - act_company_split_8.csv
  - act_company_split_9.csv
```

### ds_003 — ข้อมูลประวัติส่วนตัว และทรัพย์สินโดยสรุปของผู้ดำรงตำแหน่งทางการเมือง

```md
- person_family.csv
- political_office_holder.csv
```

### ds_004 — ข้อมูลคำชี้มูลความผิดของ ป.ป.ช.

```md
- nacc_culpability.csv
```

### ds_005 — ข้อมูลคำพิพากษาศาลฎีกาแผนกคดีอาญาของผู้ดำรงตำแหน่งทางการเมือง

```md
- judgement.csv
```

### ds_007 — รายชื่อผู้บริหารกระทรวง/ข้าราชการระดับสูง

```md
- public_sector_high_ranking_officer.csv
```

### ds_009 — ข้อมูลการบริจาคแก่พรรคการเมือง

```md
- ds009_opendata_path.json
  - political_party_donor 2556.csv
  - political_party_donor 2557.csv
  - political_party_donor 2558.csv
  - political_party_donor 2559.csv
  - political_party_donor_2552.csv
  - political_party_donor_2553.csv
  - political_party_donor_2554.csv
  - political_party_donor_2555.csv
  - political_party_donor_2556.csv
  - political_party_donor_2557.csv
  - political_party_donor_2558.csv
  - political_party_donor_2559.csv
  - political_party_donor_2560.csv
  - political_party_donor_2561.csv
  - political_party_donor_2562.csv
  - political_party_donor_2563.csv
```
