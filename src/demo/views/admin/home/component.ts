import { CreateElement } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import luckystarry from 'luckystarry'
@Component({ components: { LsApp: luckystarry.ui.LsApp } })
export class Home extends Vue {}
