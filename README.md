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

จากไฟล์ฟอนต์ จะมีรูปแบบและน้ำหนักตามตาราง

|                      | ปกติ | ขยาย<br>`.font-header` |
| -------------------- | ---- | ---------------------- |
| 400                  | ✅   | -                      |
| 700<br>`.font-bold`  | ✅   | -                      |
| 900<br>`.font-black` | -    | ✅                     |

หากไม่มีความจำเป็น ไม่แนะนำให้จิ้มด้วย class ด้านบนโดยตรง แต่ให้ใช้จาก utility class แทน

## Utilities Class

- Typescale มีให้ใช้ตามใน Figma (`.h1`–`.h4`, `.b1`–`.b7`)
- สามารถใช้ `.nobr` แทน `.whitespace-nowrap` ได้
- `.text-center` จะ apply `text-wrap: balance;` ไปด้วย ถ้าไม่ต้องการให้ข้อความวางเสมอกัน ให้ใช้เป็น `.text-center.no-balance`
