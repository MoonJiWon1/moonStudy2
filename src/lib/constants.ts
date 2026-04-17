// HowItWorks 단계 데이터
export const STEPS = [
  {
    number: '01',
    title: 'CLAUDE.md 작성',
    desc: '프로젝트 구조, 코딩 규칙, 디자인 가이드를 CLAUDE.md 한 파일에 정의한다. Claude Code가 이 파일을 매 대화마다 자동으로 읽는다.',
    tag: 'context',
  },
  {
    number: '02',
    title: 'Claude Code 실행',
    desc: 'claude 명령어로 에디터를 열면 컨텍스트가 이미 로드된 상태다. "Hero 컴포넌트 만들어줘" 한 줄로 프로젝트 규칙을 따르는 코드가 생성된다.',
    tag: 'execution',
  },
  {
    number: '03',
    title: '일관된 코드베이스',
    desc: '팀원이 바뀌어도, 대화가 새로 시작되어도 CLAUDE.md가 컨텍스트를 유지한다. 규칙 이탈 없이 프로젝트가 성장한다.',
    tag: 'consistency',
  },
]
