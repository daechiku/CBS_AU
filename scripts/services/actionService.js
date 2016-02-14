(function () {
    'use strict';
 
    app.factory('actionServices', factory);    
    
    factory.$inject = ['$http', '$location','$alert','config'];
    function factory($http, $location,$alert,config){
		var apiUrl = config.apiUrl+'/';
		
		
        function encodeData(data){
            return Object.keys(data).map(function(key) {
                if(data) return [key, data[key]].map(encodeURIComponent).join('=');
            }).join('&');
        }        
        
        var functions = {
        	apiUrl : apiUrl,
            //----- START: Init variable param find request -----//
            collect: {},
            where: {},
            whereCollect: {},
            sortBy: {},
            sortOrder: {},
            skip: {},
            limit: {},
            //----- END: Init variable param find request -----//
            
            //----- START: Init variabel pagination -----//
            currentPage: {},
            numrows: {},
            colCount: 0,
            //----- END: Init variabel pagination -----//
            
            data: {},
            dataName: {},
            f: {},
            reqQueryParams: {},
            
            collectionData: {},
            collectionDatas: {},
            
            selectData: {},
            selectDatas: {},            
            
            //START: pagination service
            pageNav: function(opt) {
        	    if(opt == 'next') this.jumpToPage(this.currentPage + 1);
        	    if(opt == 'prev') this.jumpToPage(this.currentPage - 1);
            },
        
            jumpToPage: function(num){
                if(num < 1) return alert('false input');
                if(num > this.maxPage) return alert('false input');
                
                this.currentPage = num;
                this.skip= (this.currentPage - 1) * this.limit;
                
                console.log('this.skip: ', this.skip);
                this.list();
            },
            //END: pagination service
            
            //START: Find Parameter setter
            setWhere: function(oWhere, resetKeyword){
                // reset paging
                this.currentPage[this.model] = 1
                this.skip[this.model] = (this.currentPage[this.model] - 1) * this.limit[this.model];
                
                //TODO, buat klo pas searching, keyword ga kereset, tp pas setWhere di tempat lain mesti di reset. Mungkin pake watch?
                // reset search keyword..
                console.log('resetKeyword: ', resetKeyword);
                if(!resetKeyword){
                    console.log('keyword: ', this.keyword);
                    this.keyword = '';    
                }
                
                this.where[this.model] = oWhere;
                
                this.view[this.currView]();
            },
            clearItemWhere: function(key, oWhere){
                delete this.where[this.model][key];     
                delete oWhere[key];            
                this.view[this.currView]();
            },
            
            setWhereCollect: function(oWhere){
                // reset paging
                this.whereCollect[this.model] = oWhere;
                this.view[this.currView]();
            },            
        
            setLimit: function(iLimit){
               this.currentPage = 1
		       this.skip = (this.currentPage - 1) * this.limit;
		       this.limit = iLimit;
		       this.list();
            },
        
            setSort: function(val){
                if(val == this.sortBy) this.sortOrder = (this.sortOrder == 'desc') ? 'asc' : 'desc';
			    this.sortBy = val;
			    this.list();
            },
            //END: Find Parameter setter
            
            //START: Rest Service
            findOne: function(model, id, reqQueryParams, done){
                var self = this;
                
                $http.get(apiUrl + '/' + model + '/' + id + '?' + jQuery.param(reqQueryParams))
                .then(function(response) {
                    console.log('actionService - findOne - response.data:\n', response.data);
                    self.data[self.dataName] = response.data.data;
                    self.loadingdata = false;
                    if(done) return done(null, response.data.data);
                }, function(response){
                    console.log('actionService - findOne - response.data:\n', response.data);
                    self.loadingdata = false;
                    alert('error: ' + response.data.message); 
                    if(done) return done(response.data.message);
                });
            },

            find: function(model, reqQueryParams, done){
                var self = this;
				console.log('find - url: ', model);
				
                self.loading = {};
    	        self.loadingdata = true;
                                
    	        $http.get(apiUrl + model + (!_.isEmpty(reqQueryParams) ? '/?' + jQuery.param(reqQueryParams) : ""))
    	        .then(function(response){
                    self.loadingdata = false;
                    //console.log('humane; ', humane);
                    //humane.log('welcome back');
                    if(done) return done(null, response.data);
    	        }, function(response){
                    console.log('actionService - find - response.data:\n', response.data);
                    self.loadingdata = false;
                    alert('error: ' + response.data.message); 
                    if(done) return done(response.data.message);
                });                
            },
            create: function(model, data, reqQueryParams, done){
                var self = this;
            	$http.post(apiUrl + model + (!_.isEmpty(reqQueryParams) ? '/?' + jQuery.param(reqQueryParams) : ""), {data:data}).then(function(response){
    	            console.log('response', response);
    	            if(response.data.status == 'success'){
                        if(done) return done(null, response.data.data);
    	            }
    	            if(response.data.status == 'error'){
                        if(done) return done('error');
    	            }
    	        });
            },        
            update: function(model, id, reqBody, done){
                console.log('id:', id);
                console.log('reqBody:', reqBody);
                
            	$http.put(apiUrl + model + '/' + id, {data:reqBody} ).then(function(response){
    	            console.log('response', response);
    	            if(response.data.status == 'success'){
    	               //humane.log('welcome back');
    	               if(done) return done(null, response.data.data);
    	            }
    	        });
    	       
            },
            delete: function(model,uid, idx){
                var self = this;
                
        		if (confirm('Are you sure you want to delete this?')) {
    			        return $http.delete(apiUrl + model + '/' + uid).then(function(response) {
    			            if(response.data.status == 'success') console.log('response - success', response);
    			            if(response.data.status == 'success') {
						       $alert({title: 'succes!', content: 'Data berhasil di hapus', placement: 'top', type: 'info', show: true, duration:3});
						       self.datas.splice(idx, 1);
                               self.numrows--;
						    }
    			            
    			        });
    			}
            },
            
            delete2: function(model, data, idx){
                var self = this;
                
        		if (confirm('Are you sure you want to delete this?')) {
  		            console.log('self[data]: ', self[data]);
			        var itemToDelete = self[data][idx];
			        
			        return $http.get('/api/' + model + '/destroy/' + itemToDelete.id).then(function(response) {
			            if(response.data.status == 'success') console.log('response - success', response)
			            self[data].splice(idx, 1);
			        });
    			}
            },
            //END: Rest Service
            
            findCollection: function(collection, dataSearch){
                var self = this;
                
                console.log('dataSearch: ', dataSearch);
                
                
                var sJsonWhere = JSON.stringify(self.collections[collection].fieldToSearch);
                sJsonWhere = sJsonWhere.replace('%dataSearch%', dataSearch);
                console.log('sJsonWhere: ', sJsonWhere);
                //var sJsonWhere = JSON.stringify(dataSearch); //JSON.stringify(self.collections[collection].fieldToSearch);
                var dataParams = _.merge(self.collections[collection].reqParam || {}, {where: sJsonWhere});
                //sJsonWhere = sJsonWhere.replace('%dataSearch%', dataSearch);
                
                //sJsonWhere = JSON.stringify(dataSearch);
                console.log('dataParams: ', dataParams);
				this.find(self.collections[collection].model, dataParams, function(err, res){
					self.collectionDatas[collection] = res.data;
				});
				/*
                return $http.get('/api/' + self.collections[collection].model + '/?where=' + sJsonWhere).then(function(response) {
                	console.log('response', response.data);
                	self.collectionDatas[collection] = response.data.data;
                });*/
            },
            
            findData: function(field, dataSearch){
                var self = this;
                
                console.log('dataSearch: ', dataSearch);
                
                
                var sJsonWhere = JSON.stringify(self.selects[field].fieldToSearch);
                sJsonWhere = sJsonWhere.replace('%dataSearch%', dataSearch);
                console.log('sJsonWhere: ', sJsonWhere);
                //var sJsonWhere = JSON.stringify(dataSearch); //JSON.stringify(self.collections[collection].fieldToSearch);
                var dataParams = _.merge(self.selects[field].reqParam || {}, {where: sJsonWhere});
                //sJsonWhere = sJsonWhere.replace('%dataSearch%', dataSearch);
                
                //sJsonWhere = JSON.stringify(dataSearch);
                console.log('dataParams: ', dataParams);
				this.find(self.selects[field].model, dataParams, function(err, res){
					self.selectDatas[field] = res.data;
				});
				/*
                return $http.get('/api/' + self.collections[collection].model + '/?where=' + sJsonWhere).then(function(response) {
                	console.log('response', response.data);
                	self.collectionDatas[collection] = response.data.data;
                });*/
            }, 
            list: function(){
            	var self = this;
            	 var sWhere  = {}
			        if(!_.isEmpty(this.where)) {sWhere = this.where}
			       
			        var sSort = {};
			       
			        if(this.sortBy) {
			        	sSort[this.sortBy]= this.sortOrder;
			        } 
			         //console.log(sSort)
			        var dataParams = {
			            filter: sWhere,
			            order:  sSort,
			            page: this.currentPage,
			            limit: this.limit,
			            objectRel: this.objectRel
			        }
			        console.log(this.model, dataParams, this.orWhere);
			        if(!_.isEmpty(this.orWhere)) { dataParams.filteror = this.orWhere}
			        
			        this.whereData = jQuery.param(dataParams); 
			        
			        return $http.get(apiUrl+this.model+'?' + jQuery.param(dataParams)).then(function(response) {
			            if(response.data){
			                console.log('response', response.data)
			                self.datas = response.data.data;
			                self.numrows = response.data.numrows;
			                self.skip = 0;
			                self.limit = response.data.listperpage;
			                
			                //paging setup
			                self.startRow = self.skip + 1;
			                self.endRow = self.currentPage * self.limit;
			                if(self.endRow > response.data.numrows) self.endRow = response.data.numrows
			                
			                self.maxPage = Math.ceil(response.data.numrows / response.data.limit);
			                self.loadingdata = false;
			            }
			        });
            },           
            //main            
            createOrUpdate: function(model,done,modal){
                var self = this;
                var reqData = angular.copy(this.f);
                //return false;
                if(this.itemId){
                    return this.update(model, this.itemId, reqData, function(err, resData){
                        if(err){
                        	var myAlert = $alert({title: 'Error!', content: 'Data gagal diperbaharui.', placement: 'top-rigth', type: 'danger', show: true, duration:3});	
                        } else {
                        	var myAlert = $alert({title: 'success!', content: 'Data berhasil diperbaharui.', placement: 'top-right', type: 'info', show: true, duration:3});
                        }
                        
                        self.list();
                        if(modal){
                        	modal.hide();
                        }
                        if(done) return done(null, resData);
                    });
                }
                
                return this.create(model, reqData, {}, function(err, resData){
                	if(err){
                		var myAlert = $alert({title: 'Error!', content: 'Data gagal di tambahkan.',  type: 'danger', show: true, container:'#result-alert'});
                	} else {
                		var myAlert = $alert({title: 'Success!', content: 'Data berhasil ditambahkan.', placement: 'top-right', type: 'info', show: true, duration:3});
                		//console.log(self.redirectAfterSuccess);
                		if(modal){
                        	modal.hide();
                     	}
                	}
                	self.list();
                	 
                	if(done) return done(null, resData);
                });
            },
            execView: function execView($state, $stateParams){
                var route = $state.current.url.split('/');
                console.log(route);
                console.log($state.current.url);
            	if($stateParams.itemId){
                    this.itemId = $stateParams.itemId;
                   
                    if(route[2] && route[2] != ':itemId'){
                        //route:  ["", ":itemId", "places"]
                        this.currView = route[2];
                        return this.view[route[2]]($stateParams.itemId);
                    }
                    
                    //selain diatas, berarti lg mode edit
                    this.currView = route[1];
                    return this.view[route[1]]($stateParams.itemId);
                    
            	}else{
            		//console.log('route[1].split(?): ', route[1].split('?'));
            		
            		route[1] = route[1].split('?')[0];
            		
                    this.currView = route[1];
            		this.view[route[1]]();
            	}                
            },
            findOneAndInitForm: function(id, dataParams){
                var self = this;
                self.loadingdata = true;
                
                $http.get('/api/' + self.model + '/' + id + '?' + jQuery.param(dataParams)).then(function(response) {
                    console.log('response', response.data);
                    
                    if(response.data.status == 'success'){
                        self.data[self.dataName] = response.data.data;
                        self.loadingdata = false;
                        
                        //----- START: initial select collections -----//
                        _.each(self.collections, function(valCollection, keyCollection){
                            if(self.data[self.dataName][keyCollection]){
                                self.collectionData[keyCollection] = {};
                                self.collectionData[keyCollection].selected = {};
                                self.collectionData[keyCollection].selected[self.collections[keyCollection].fieldToDisplay] = self.data[self.dataName][keyCollection][self.collections[keyCollection].fieldToDisplay];                                
                            }
                        });              
                        //----- END: initial select collections -----//
                        
                        //----- START: initial select Static Option / enums -----//
                        _.each(self.selects, function(valSelect, keySelect){
                            if(self.data[self.dataName][keySelect]){
                                self.selectData[keySelect] = {};
                                self.selectData[keySelect].selected = {};
                                self.selectData[keySelect].selected[self.selects[keySelect].fieldToDisplay] = self.data[self.dataName][keySelect];                                
                            }
                        });
                        //----- END: initial select Static Option / enums -----//      
                    }
                });              
                
            },
            
            initFormEdit: function(data){
                var self = this;
                
                self.dataName = self.model;
                self.data[self.dataName] = data;
                
                //----- START: initial select collections -----//
                _.each(self.collections, function(valCollection, keyCollection){
                    if(self.data[self.dataName][keyCollection]){
                        self.collectionData[keyCollection] = {};
                        self.collectionData[keyCollection].selected = {};
                        self.collectionData[keyCollection].selected[self.collections[keyCollection].fieldToDisplay] = self.data[self.dataName][keyCollection][self.collections[keyCollection].fieldToDisplay];                                
                    }
                });              
                //----- END: initial select collections -----//
                
                //----- START: initial select Static Option / enums -----//
                _.each(self.selects, function(valSelect, keySelect){
                    if(self.data[self.dataName][keySelect]){
                        self.selectData[keySelect] = {};
                        self.selectData[keySelect].selected = {};
                        self.selectData[keySelect].selected[self.selects[keySelect].fieldToDisplay] = self.data[self.dataName][keySelect];                                
                    }
                });
                //----- END: initial select Static Option / enums -----//
            },            
                
            initFormAdd: function(id, dataParams){
                var self = this;
                
                //----- START: initial select collections -----//
                _.each(self.collections, function(valCollection, keyCollection){
                    
                    //setting default jika ada
                    if(self.collections[keyCollection].defaultsTo){    
                        self.collectionData[keyCollection] = {};
                        self.collectionData[keyCollection].selected = {};
                        self.collectionData[keyCollection].selected[self.collections[keyCollection].fieldToDisplay] = self.collections[keyCollection].defaultsTo;                           
                    }
                });
                //----- END: initial select collections -----//
                
                //----- START: initial select Static Option / enums -----//
                _.each(self.selects, function(valSelect, keySelect){
                    if(self.selects[keySelect].defaultsTo){
                        self.selectData[keySelect] = {};
                        self.selectData[keySelect].selected = {};
                        self.selectData[keySelect].selected[self.selects[keySelect].fieldToDisplay] = self.selects[keySelect].defaultsTo;
                    }
                });
                //----- END: initial select Static Option / enums -----//                             
            },
            listAndInitPaging: function(dataParams, done){
                var self = this;

                self.currentPage[self.model] = (self.currentPage[self.model]) ? self.currentPage[self.model] : 1;
                self.numrows = {};
                self.startRow = {};
                self.endRow = {};
                self.maxPage = {};
                
                this.find(self.model, dataParams, function(err, res){
                    self.data[self.dataName] = res.data;
                    
                    self.numrows[self.model] = res.metadata.numrows;
                    self.skip[self.model] = res.metadata.skip;
                    self.limit[self.model] = res.metadata.limit;
                    
                    //paging setup
                    self.startRow[self.model] = self.skip[self.model] + 1;
                    self.endRow[self.model] = self.currentPage[self.model] * self.limit[self.model];
                    if(self.endRow[self.model] > self.numrows[self.model]) self.endRow[self.model] = self.numrows[self.model];
                    self.maxPage[self.model] = Math.ceil(self.numrows[self.model] / self.limit[self.model]);
                    //end paging setup
                    
                    //START: colCount
                    //Desc: Menghitung jumlah td di th untuk kebutuhan colspan "No data".
                    //Masih pake jQuery cuy :D
                    var colCount = 0;
                    jQuery('tr:nth-child(1) th').each(function () {
                        if ($(this).attr('colspan')) {
                            colCount += +$(this).attr('colspan');
                        } else {
                            colCount++;
                        }
                    });
                    console.log('colCount: ', colCount);
                    self.colCount = colCount;
                    //END: colCount
                    
                    if(done) return done(null, res.data);                        
                });
            },
            
            initTable: function(data, pagination){
                var self = this;

                self.currentPage[self.model] = (self.currentPage[self.model]) ? self.currentPage[self.model] : 1;
                
                self.numrows = {};
                self.skip = {};
                self.limit = {};
                
                self.startRow = {};
                self.endRow = {};
                self.maxPage = {};
                

                self.data[self.dataName] = data;
                
                self.numrows[self.model] = pagination.numrows;
                self.skip[self.model] = pagination.skip;
                self.limit[self.model] = pagination.limit;
                
                console.log('initTable - self.skip: ', self.skip);
                
                //paging setup
                self.startRow[self.model] = self.skip[self.model] + 1;
                self.endRow[self.model] = self.currentPage[self.model] * self.limit[self.model];
                if(self.endRow[self.model] > self.numrows[self.model]) self.endRow[self.model] = self.numrows[self.model];
                self.maxPage[self.model] = Math.ceil(self.numrows[self.model] / self.limit[self.model]);
                //end paging setup
                
                //START: colCount
                //Desc: Menghitung jumlah td di th untuk kebutuhan colspan "No data".
                //Masih pake jQuery cuy :D
                var colCount = 0;
                jQuery('tr:nth-child(1) th').each(function () {
                    if ($(this).attr('colspan')) {
                        colCount += +$(this).attr('colspan');
                    } else {
                        colCount++;
                    }
                });
                console.log('colCount: ', colCount);
                self.colCount = colCount;
                //END: colCount
            },            
            
            //collection

            createOrUpdateCollection: function(model, done){
                var self = this;
                
                var dataForm = this.f;
                
                //----- START: validation collections -----//
                _.each(this.collectionData, function(valCollection, keyCollection){
                    if(valCollection.selected && valCollection.selected[self.collections[keyCollection].fieldToSave])
                        dataForm[keyCollection] = valCollection.selected[self.collections[keyCollection].fieldToSave];
                });
                //----- END: validation collections -----//
                
                //----- START: validation selec Static Option / enums -----//
                _.each(this.selectData, function(valSelect, keySelect){
                    if(valSelect.selected && valSelect.selected[self.selects[keySelect].fieldToSave])
                        dataForm[keySelect] = valSelect.selected[self.selects[keySelect].fieldToSave];
                });
                //----- END: validation Static Option / enums -----//
                
                //bersih data null / blank, takut kena kasus require di backend model nya
                dataForm = (function filter(obj) {
                    var filtered = _.pick(obj, function (v) { return v !== '' && v !== null; });
                    return _.cloneDeep(filtered, function (v) { return v !== filtered && _.isPlainObject(v) ? filter(v) : undefined; });
                })(dataForm);
                
                if(this.mode == 'edit'){
                    return this.update(model, this.itemId, dataForm, function(err, resData){
                        return done(null, resData);
                    });
                }                
                
                this.create(model, dataForm, self.dataParam, function(err, resData){
                    console.log('this create');
                    
                    if(resData){
                        if(self.redirectAfterSuccess){
                            console.log('if self.redirectAfterSuccess - true');
                            return $location.path(self.redirectAfterSuccess);    
                        }
                        
                        return done(null, resData);
                    }
                });
            },            
                                     
        };
        
        return functions;
    }
})();