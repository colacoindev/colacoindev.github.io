$(document).ready(function(){
	var web3 = null;
	var account = null;
	var setgas = 0;
	var setlimit = 1100000;
	var times = 10*1000;
	var myValue = 0;
	var totalValue = 0;	
	var upAddress = null;
	var lpAddress = '0xDF2fFD6b7119daEB684f6Bdd053f713f6a20a652';
	var colaAddress = '0x88c1e14f261cF347f402060a746ad8515545D739';
	const Erc20Abi = '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"cola","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"colaToken","outputs":[{"internalType":"contract ColaToken","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getJgTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"jgTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lpCola","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_colaToken","type":"address"}],"name":"setColaToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_jgTime","type":"uint256"}],"name":"setJgTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_lpToken","type":"address"}],"name":"setLpToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
	const colaAbi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeFromFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"includeInFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"setDevAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"devFee","type":"uint256"}],"name":"setDevFeePercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"superAddress","type":"address"}],"name":"setInvite","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"levelFee","type":"uint256"}],"name":"setLeveFeePercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"liquidityFee","type":"uint256"}],"name":"setLiquidityFeePercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"setLpAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"lpFee","type":"uint256"}],"name":"setLpFeePercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"numToken","type":"uint256"}],"name":"setNumTokenPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setSwapAndLiquifyEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[],"name":"_devAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_devFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_levelFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_lpAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_lpFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_ownerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"amount","type":"address"}],"name":"getUpAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"sjAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startFlag","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapAndLiquifyEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IPancakeRouter02","name":"","type":"address"}],"stateMutability":"view","type":"function"}]';
	async function initWeb3Account () {
		upAddress = GetQueryValue('upAddress');
		//upAddress = '0x6d6fEdfBB289A53B09a20264260FbCaC6A956dD7';
		$("#sjId").val(upAddress);
		var web3provider = null;
		if (window.ethereum) {
			var web3provider = window.ethereum;
			try {
				await window.ethereum.enable();
			} catch (error) {
				console.log("User denied account access");
			}
		} else if (window.web3) {
			var web3provider = window.web3.currentProvider;
		} else {
			web3provider = new Web3.providers.HttpProvider("https://bsc.mytokenpocket.vip");
			//web3provider = new window.Web3.providers.HttpProvider('https://bsc.mytokenpocket.vip')
		}
		web3 = new Web3(web3provider);
		setgas = await web3.eth.getGasPrice();
		web3.eth.getAccounts(async (error, result) => {
			account = result[0];
			var viewAccount = account.substr(0,8)
			$("#accountId").text(viewAccount)
			$("#yqLineId").text("http://colacoin.co/?&upAddress=" + account)
			const contract = new web3.eth.Contract(JSON.parse(Erc20Abi), lpAddress)
			const colaContract = new web3.eth.Contract(JSON.parse(colaAbi), colaAddress)
			
			try {
			  myValue = (await contract.methods.earned(account).call() / 1e18).toFixed(2)
			  totalValue = (await colaContract.methods.balanceOf(lpAddress).call() / 1e18).toFixed(2)
			  times = (await contract.methods.getJgTime(account).call()) * 1000
			  $("#myNumber").text(myValue)
			  $("#totalNumber").text(totalValue)
			  
			  initCountdown(times)
			} catch (err) {
			  // TODO handle the exception
			}
		})
	}
	
	initWeb3Account()
	
	function GetQueryValue(queryName) {
	      var query = decodeURI(window.location.search.substring(1));
	      var vars = query.split("&");
	     for (var i = 0; i < vars.length; i++) {
	         var pair = vars[i].split("=");
	         if (pair[0] == queryName) { return pair[1]; }
	     }
	     return null;
	}
	
	
	// 获取倒计时 
	function getCountdown(time) {
		var hour = Math.floor(time /(60*60*1000))
		var min = Math.floor((time - hour*60*60*1000)/(60*1000))
		var second = (time - hour*60*60*1000 -  min*60*1000)/1000
		var hourStr = hour  < 10 ? '0' + hour : hour
		var minStr = min  < 10 ? '0' + min : min
		var secondStr =  second  < 10 ? '0' + second : second
		var timeStr = hourStr + ":" + minStr + ":" + secondStr
		return timeStr
	}
	

	function initCountdown (time) {
		var timeStr = getCountdown(time)
		$("#timer").text(timeStr)
		var nextTime = time - 1000
		if(nextTime < 0 ) {
			clearTimeout(timer)
			$("#timer").text("00:00:00")
			// 定时器到0时移除领取按钮禁用
			$("#receive").removeClass("disabled")
		}
		var timer = setTimeout(function(){
			initCountdown(nextTime)
		},1000)
	}
	
	//initCountdown(times)
  
	// 点击领取按钮
	$("#receive").click(async function(){
		// 定时器到0时才能领取
		var className = this.className
		if(className.indexOf("disabled") == -1){
			const contract = new web3.eth.Contract(JSON.parse(Erc20Abi), lpAddress)
			let tx = await contract.methods.getReward()
			var encodedABI = tx.encodeABI()
			var message = { from: account, to: lpAddress, data: encodedABI, gasLimit: setlimit, gasPrice: web3.utils.toHex(setgas), chainId: 56 }
			try {
				var a = await web3.eth.sendTransaction(message)
				if (a.status) {
				  $("#receive-modal").modal()
				  initWeb3Account()
				} else {
				  
				}
			} catch (err) {
			
			}
		}
		
		  
	})
  
	// 点击生成按钮
	$("#create").click(function(){
		// 请绑定联系人弹框
		$("#bind-modal").modal()
	})
	
	
	// 绑定联系人弹框确认按钮
	$("#bind-ok").click(async function(){
		$("#bind-ok").addClass("disabled")
		
		var a = document.getElementById("sjId").value
		const contract = new web3.eth.Contract(JSON.parse(colaAbi), colaAddress)
		let tx = await contract.methods.setInvite(a)
		var encodedABI = tx.encodeABI()
		var message = { from: account, to: colaAddress, data: encodedABI, gasLimit: setlimit, gasPrice: web3.utils.toHex(setgas), chainId: 56 }
		try {
			var b = await web3.eth.sendTransaction(message)
			if (b.status) {
			  $("#bind-modal").modal('hide')
			  $("#bd-modal").modal()
			} else {
			  $("#bind-modal").modal('hide')
			}
		} catch (err) {
		
		}
		
	})
	
	
	// 复制按钮
	$("#copy").click(function(){
		var text = "http://colacoin.co/?&upAddress=" + account;
		var flag = copyText(text);//这个必须在DOM对象的事件线程中执行
		if (flag) {
			$("#copy-modal").modal()
		}
	})
	
	// 复制成功弹框确认按钮
	$("#copy-ok").click(function(){
		$("#copy-modal").modal('hide')
	})	
	
	// 领取成功弹框确认按钮
	$("#receive-ok").click(function(){
		$("#receive-modal").modal('hide')
	})
		
	// 绑定成功弹框确认按钮
	$("#bd-ok").click(function(){
		$("#bd-modal").modal('hide')
	})
	
	function copyText(text) {
		var textarea = document.createElement("textarea");
		var currentFocus = document.activeElement;
		document.body.appendChild(textarea);
		textarea.value = text;
		textarea.focus();
		if (textarea.setSelectionRange)
			textarea.setSelectionRange(0, textarea.value.length);
		else
			textarea.select();
		try {
			var flag = document.execCommand("copy");
		} catch(eo){
			var flag = false;
		}
		document.body.removeChild(textarea);
		currentFocus.focus();
		return flag;
	}
	
});