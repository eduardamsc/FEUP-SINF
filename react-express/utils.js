const _ = require('lodash')

function hasFields(obj, fields) {
 return _.every(fields,_ .partial(_.has, obj))
}

function omitFields(obj, fields) {
 return _.omit(obj, fields)
}

function pickFields(obj, fields) {
 return _.pick(obj, fields)
}

module.exports = {
 hasFields: hasFields,
 omitFields: omitFields,
 pickFields: pickFields
}