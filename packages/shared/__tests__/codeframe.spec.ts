import { generateCodeFrame } from "../src/codeframe";

describe('compiler: codeframe', () => {
    const source = `
<div>
    <template key="one"></template>
    <ul>
        <li v-for="footbar">hi</li>
    </ul>
    <template key="two"></template>
</div>
    `.trim()

})