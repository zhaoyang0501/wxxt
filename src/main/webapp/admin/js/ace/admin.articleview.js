jQuery.article = {
		userDataTable:null,
		initSearchDataTable : function() {
			if (this.userDataTable == null) {
				this.userDataTable = $('#dt_table_view').dataTable({
					"sDom" : "<'row-fluid'<'span6'l>r>t<'row-fluid'<'span6'i><'span6'p>>",
					"sPaginationType" : "bootstrap",
					"oLanguage" : {
						"sLengthMenu" : "每页显示 _MENU_ 条记录",
						"sZeroRecords" : "抱歉， 暂时没有记录",
						"sInfo" : "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
						"sSearch" : "",
						"sInfoEmpty" : "没有数据",
						"sInfoFiltered" : "(从 _MAX_ 条数据中检索)",
						"oPaginate" : {
							"sFirst" : "首页",
							"sPrevious" : "前一页",
							"sNext" : "后一页",
							"sLast" : "尾页"
						}
					},
					"bAutoWidth" : false,
					"iDisplayLength" : 10,
					"aLengthMenu" : [ 5, 10, 25, 50],
					"bServerSide" : true,
					"sServerMethod" : "POST",
					"bProcessing" : true,
					"bSort" : false,
					"sAjaxSource" : $.ace.getContextPath() + "/admin/articleview/list",
					"fnDrawCallback" : function(oSettings) {
						$('[rel="popover"],[data-rel="popover"]').popover();
					},
					"fnServerData" : function(sSource, aoData, fnCallback) {
						var title = $("#_title").val();
						var keyword = $("#_keyword").val();
						var summary = $("#_summary").val();
						if (!!title) {
							aoData.push({
								"name" : "title",
								"value" : title
							});
						}
						if (!!keyword) {
							aoData.push({
								"name" : "keyword",
								"value" : keyword
							});
						}
						if (!!summary) {
							aoData.push({
								"name" : "summary",
								"value" : summary
							});
						}
						$.ajax({
							"dataType" : 'json',
							"type" : "POST",
							"url" : sSource,
							"data" : aoData,
							"success" : function(data){
								fnCallback(data);
							}
						});
					},
					"aoColumns" : [{
						"mDataProp" : "id"
					}, {
						"mDataProp" : "category.name"
					},{
						"mDataProp" : "title"
					},{
						"mDataProp" : "keyword"
					},{
						"mDataProp" : "summary"
					},{
						"mDataProp" : "clickcount"
					},{
						"mDataProp" : "user.name"
					},{
						"mDataProp" : "createDate"
					},{
						"mDataProp" : ""
					}],
					"aoColumnDefs" : [
						{
							'aTargets' : [8],
							'fnRender' : function(oObj, sVal) {
								return" <a href='"+ $.ace.getContextPath() + "/admin/articleview/view/"+oObj.aData.id+"'>查看</a> ";
							}
						},
					 {
						'aTargets' : [ '_all' ],
						'bSortable' : false,
						'sClass' : 'center'
					}]

				});
			} else {
				var oSettings = this.userDataTable.fnSettings();
				oSettings._iDisplayStart = 0;
				this.userDataTable.fnDraw(oSettings);
			}

		},
		deleteUser :function(id){
			bootbox.confirm( "是否确认删除？", function (result) {
	            if(result){
	            	$.ajax({
	        			type : "get",
	        			url : $.ace.getContextPath() + "/admin/article/delete/"+id,
	        			dataType : "json",
	        			success : function(json) {
	        				if(json.state=='success'){
	        					noty({"text":""+ json.msg +"","layout":"top","type":"success","timeout":"2000"});
	        					$.article.initSearchDataTable();
	        				}else{
	        					noty({"text":""+ json.resultMap.msg +"","layout":"top","type":"warning"});
	        				}
	        			}
	        		});
	            }
	        });
		},
		showUserAddModal: function(id){
			$("#id").val(id);
			$('#_modal').modal({
			});
			$("#_modal").modal('show');
		},
		showEdit: function (id){
			$("#id").val(id);
			$.ajax({
    			type : "get",
    			url : $.ace.getContextPath() + "/admin/article/get/"+id,
    			dataType : "json",
    			success : function(json) {
    				if(json.state=='success'){
    					$("input[name='title']").val(json.object.title);
    					$("input[name='keyword']").val(json.object.keyword);
    					$("textarea[name='summary']").val(json.object.summary);
    				}else{
    					noty({"text":""+ json.msg +"","layout":"top","type":"warning"});
    				}
    			}
    		});
			$("#_modal").modal('show');
		},
		
		saveUser: function(id){
			$.ajax({
    			type : "post",
    			url : $.ace.getContextPath() + "/admin/article/save",
    			data:$("form").serialize(),
    			dataType : "json",
    			success : function(json) {
    				if(json.state=='success'){
    					$("#_modal").modal('hide');
    					noty({"text":""+ json.msg +"","layout":"top","type":"success","timeout":"2000"});
    					$.article.initSearchDataTable();
    				}else{
    					noty({"text":""+ json.msg +"","layout":"top","type":"warning"});
    				}
    			}
    		});
		}
		
};