# Corrupt0 — ACT AI

ไฟล์นี้จะเอาไว้ Log Feature หรือวิธีการทำสิ่งต่างๆ เพื่อให้สามารถ dev ได้อย่างราบรื่น

## Dev & Build

โปรเจกต์นี้ใช้ [pnpm](https://pnpm.io/) ดังนั้นเราจะ dev ด้วยคำสั่ง:

```bash
pnpm dev
```

และสามารถ build ได้ด้วยคำสั่ง:

```bash
pnpm build
```

ไฟล์จะอยู่ในโฟล์เดอร์ `/out`

## Font

จากไฟล์ฟอนต์ จะมีรูปแบบความกว้าง (ปกติ/บีบ/ขยาย) และน้ำหนักตามตาราง

|                      | ปกติ | บีบ<br>`.font-condensed` | ขยาย<br>`.font-expanded` |
| -------------------- | ---- | ------------------------ | ------------------------ |
| 300<br>`.font-light` | -    | ✅                       | -                        |
| 400                  | ✅   | เหมือน 300               | ✅                       |
| 700<br>`.font-bold`  | ✅   | ✅                       | เหมือน 900               |
| 900<br>`.font-black` | -    | -                        | ✅                       |

เพื่อความสะดวก:

- `.font-condensed` (ที่ไม่คู่กับ `.font-bold`) จะเหมือน `.font-condensed.font-light`
- `.font-expanded.font-bold` จะเหมือน `.font-expanded.font-black`

## Utilities Class

- สามารถใช้ `.nobr` แทน `.whitespace-nowrap` ได้
- `.text-center` จะ apply `text-wrap: balance;` ไปด้วย ถ้าไม่ต้องการให้ข้อความวางเสมอกัน ให้ใช้เป็น `.text-center.no-balance`
