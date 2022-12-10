import { makeMap } from './makeMap'

const GlOBALS_WHITE_LISTED =
  'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' +
  'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' +
  'Object,Boolean,String,RegExp,Map,Set,JSON,Intl'

export const isGloballyWhitelisted = /*#__PURE__*/ makeMap(GlOBALS_WHITE_LISTED)
