import { CreateElement } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import luckystarry from 'luckystarry'
@Component({ components: { LsFrameList: luckystarry.ui.frame.LsFrameList } })
export class List extends Vue {}
