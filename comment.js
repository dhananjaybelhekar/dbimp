const mongoose = require('mongoose');
const dbComment = mongoose.model('Comment', { name: String });
module.exports={
	save:()=>{
		console.log('save');
		const kitty = new dbComment({ name: 'Zildjian' });
		kitty.save().then(() => console.log('meow'));
	},
	find:(qr,cb)=>{
		dbComment.find(evaluate(qr)).exec(cb);
	},
	dt:(qr,cb)=>{
  	var dtop={
		conditions: evaluate(qr.qr),
		select:evaluate(qr.select)};
  		dbComment.dataTable(evaluate(qr.dt),dtop,cb);
	}

}
function evaluate(object) {
    if (object && object.constructor === Array) {
        for (var i = 0; i < object.length; i++) {
            object[i] = evaluate(object[i]);
        }
    } else if (object && typeof object == 'object' && Object.keys(object).length > 0) {
        if (Object.keys(object).indexOf('_eval') < 0) {
            for (var key in object) {
                object[key] = evaluate(object[key]);
            }
        } else switch (object['_eval']) {
            case 'Id':
                {
                    object = mongoose.Types.ObjectId(object['value']);
                    break;
                }
			case 'regex':
                {
                    object = new RegExp(object['value'], 'i');
                    break;
                }
                case 'number':
                {
                    object = Number(object['value']);
                    break;
                }

        }
    }
    return object;
}
