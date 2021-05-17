import { init } from 'snabbdom/build/init'
import { attributesModule } from 'snabbdom/build/modules/attributes'
import { eventListenersModule } from 'snabbdom/build/modules/eventlisteners'
import { styleModule } from 'snabbdom/build/modules/style'

let patch = init([attributesModule, eventListenersModule, styleModule])

export default patch