var DataStore = require('./DataStore.js');
function Model(schema){
	this.schema = schema;
	this.id = null;
	for(var k in schema){
		this[k] = null;
	}
	//DataStore.store[this.constructor.name] === Model's array;
	DataStore.store[this.constructor.name] = DataStore.store[this.constructor.name] || [];

}

Model.getNextId = function() {
  if (!DataStore.store[this.name].length) {
    this.id = 1;
  } else {
    this.id = DataStore.store[this.name].length;
    this.id++;
  }
  return this.id;
};


Model.find = function(id){
	for(var i =0; i < DataStore.store[this.name].length; i++){
		if(DataStore.store[this.name][i].id  === id){
			return DataStore.store[this.name][i];
		}
	}
	return null;
	}

Model.extend = function(klass){
	for(var k in this){
		if(this.hasOwnProperty(k)){
			klass[k] = this[k];
		}
	}

	for(var j in this.prototype){
		if(this.prototype.hasOwnProperty(j)){
			klass.prototype[j] = this.prototype[j];
		}
	}
  return klass;
	}

Model.prototype.destroy = function(){
	if(this.id){
		var remove = this.constructor.find(this.id);
		var index = DataStore.store[this.constructor.name].indexOf(remove);
	//	console.log(index);
		DataStore.store[this.constructor.name].splice(index,1);
		//console.log(DataStore.store[this.constructor.name]);
	}

	return null;
};


Model.prototype.save = function() {
	if(!this.id){
	this.id = this.constructor.getNextId();
	DataStore.store[this.constructor.name].push(this);
	}
};




module.exports = Model;