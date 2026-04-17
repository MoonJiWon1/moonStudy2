import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const FILE_PATH = path.join(process.cwd(), 'CLAUDE.md')

// CLAUDE.md 내용 읽기
export async function GET() {
  const content = await readFile(FILE_PATH, 'utf-8')
  return Response.json({ content })
}

// CLAUDE.md 내용 저장
export async function POST(req: Request) {
  const { content } = await req.json()
  await writeFile(FILE_PATH, content, 'utf-8')
  return Response.json({ ok: true })
}
