
let bankValue = 1000;
let currentBet = 0;
let wager = 5;
let lastWager = 0;
let bet = [];
let numbersBet = [];
let previousNumbers = [];

let numRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
let wheelnumbersAC = [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32];

let container = document.createElement('div');
container.setAttribute('id', 'container');
document.body.append(container);

// let ABI = [ { "inputs": [ { "internalType": "uint256", "name": "_minimumBet", "type": "uint256" }, { "internalType": "uint256", "name": "_maximumBet", "type": "uint256" }, { "internalType": "uint256", "name": "_houseEdge", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "player", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "betNumber", "type": "uint256" } ], "name": "Betting", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "_betNumber", "type": "uint256" } ], "name": "bet", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "houseEdge", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maximumBet", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "minimumBet", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "spin", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "withdrawFunds", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]
// let ByteCode = "608060405234801561000f575f80fd5b50604051610a1f380380610a1f833981810160405281019061003191906100c4565b335f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550826001819055508160028190555080600381905550505050610114565b5f80fd5b5f819050919050565b6100a381610091565b81146100ad575f80fd5b50565b5f815190506100be8161009a565b92915050565b5f805f606084860312156100db576100da61008d565b5b5f6100e8868287016100b0565b93505060206100f9868287016100b0565b925050604061010a868287016100b0565b9150509250925092565b6108fe806101215f395ff3fe60806040526004361061006f575f3560e01c80638da5cb5b1161004d5780638da5cb5b146100e1578063c38a8afd1461010b578063d667dcd714610135578063f0acd7d51461015f5761006f565b8063155dd5ee14610073578063227cade51461009b5780637365870b146100c5575b5f80fd5b34801561007e575f80fd5b50610099600480360381019061009491906104cd565b610169565b005b3480156100a6575f80fd5b506100af61029f565b6040516100bc9190610507565b60405180910390f35b6100df60048036038101906100da91906104cd565b6102a5565b005b3480156100ec575f80fd5b506100f561039b565b604051610102919061055f565b60405180910390f35b348015610116575f80fd5b5061011f6103be565b60405161012c9190610507565b60405180910390f35b348015610140575f80fd5b506101496103c4565b6040516101569190610507565b60405180910390f35b6101676103ca565b005b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ed906105d2565b60405180910390fd5b47811115610239576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102309061063a565b60405180910390fd5b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc8290811502906040515f60405180830381858888f1935050505015801561029b573d5f803e3d5ffd5b5050565b60025481565b60015434101580156102b957506002543411155b6102f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102ef906106a2565b60405180910390fd5b5f8110158015610309575060248111155b610348576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161033f9061070a565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff167f69a433170540cf154f5b0f181a6d2506180ea2364d18b9d710d8da283ffdf4c63483604051610390929190610728565b60405180910390a250565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b60035481565b5f6103d3610459565b90505f6024346103e3919061077c565b90505f6064600354836103f6919061077c565b61040091906107ea565b9050808261040e919061081a565b91503373ffffffffffffffffffffffffffffffffffffffff166108fc8390811502906040515f60405180830381858888f19350505050158015610453573d5f803e3d5ffd5b50505050565b5f6025424460405160200161046f92919061086d565b604051602081830303815290604052805190602001205f1c6104919190610898565b905090565b5f80fd5b5f819050919050565b6104ac8161049a565b81146104b6575f80fd5b50565b5f813590506104c7816104a3565b92915050565b5f602082840312156104e2576104e1610496565b5b5f6104ef848285016104b9565b91505092915050565b6105018161049a565b82525050565b5f60208201905061051a5f8301846104f8565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61054982610520565b9050919050565b6105598161053f565b82525050565b5f6020820190506105725f830184610550565b92915050565b5f82825260208201905092915050565b7f4f6e6c79206f776e65722063616e2077697468647261772066756e64730000005f82015250565b5f6105bc601d83610578565b91506105c782610588565b602082019050919050565b5f6020820190508181035f8301526105e9816105b0565b9050919050565b7f496e73756666696369656e742062616c616e63650000000000000000000000005f82015250565b5f610624601483610578565b915061062f826105f0565b602082019050919050565b5f6020820190508181035f83015261065181610618565b9050919050565b7f496e76616c69642062657420616d6f756e7400000000000000000000000000005f82015250565b5f61068c601283610578565b915061069782610658565b602082019050919050565b5f6020820190508181035f8301526106b981610680565b9050919050565b7f496e76616c696420626574206e756d62657200000000000000000000000000005f82015250565b5f6106f4601283610578565b91506106ff826106c0565b602082019050919050565b5f6020820190508181035f830152610721816106e8565b9050919050565b5f60408201905061073b5f8301856104f8565b61074860208301846104f8565b9392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6107868261049a565b91506107918361049a565b925082820261079f8161049a565b915082820484148315176107b6576107b561074f565b5b5092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f6107f48261049a565b91506107ff8361049a565b92508261080f5761080e6107bd565b5b828204905092915050565b5f6108248261049a565b915061082f8361049a565b92508282039050818111156108475761084661074f565b5b92915050565b5f819050919050565b6108676108628261049a565b61084d565b82525050565b5f6108788285610856565b6020820191506108888284610856565b6020820191508190509392505050565b5f6108a28261049a565b91506108ad8361049a565b9250826108bd576108bc6107bd565b5b82820690509291505056fea26469706673582212206162827faa127709dfde880a748ddff71ed3c40bcd661264e7c5f9b97b715f0b64736f6c63430008190033";
// let signInButton = document.createElement('button');
// signInButton.setAttribute('class', 'signInButton');
// container.append(signInButton);
// signInButton.innerText = 'Start';
// signInButton.addEventListener('click', async function(){
//     deployContract();
// });

startGame();

let wheel = document.getElementsByClassName('wheel')[0];
let ballTrack = document.getElementsByClassName('ballTrack')[0];

function resetGame(){
	bankValue = 1000;
	currentBet = 0;
	wager = 5;
	bet = [];
	numbersBet = [];
	previousNumbers = [];
	document.getElementById('betting_board').remove();
	document.getElementById('notification').remove();
	buildBettingBoard();
}

function startGame(){
	buildWheel();
	buildBettingBoard();
}

function gameOver(){
	let notification = document.createElement('div');
	notification.setAttribute('id', 'notification');
		let nSpan = document.createElement('span');
		nSpan.setAttribute('class', 'nSpan');
		nSpan.innerText = 'Bankrupt';
		notification.append(nSpan);

		let nBtn = document.createElement('div');
		nBtn.setAttribute('class', 'nBtn');
		nBtn.innerText = 'Play again';	
		nBtn.onclick = function(){
			resetGame();
		};
		notification.append(nBtn);
	container.prepend(notification);
}

function buildWheel(){
	let wheel = document.createElement('div');
	wheel.setAttribute('class', 'wheel');

	let outerRim = document.createElement('div');
	outerRim.setAttribute('class', 'outerRim');
	wheel.append(outerRim);

	let numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
	for(i = 0; i < numbers.length; i++){
		let a = i + 1;
		let spanClass = (numbers[i] < 10)? 'single' : 'double';
		let sect = document.createElement('div');
		sect.setAttribute('id', 'sect'+a);
		sect.setAttribute('class', 'sect');
		let span = document.createElement('span');
		span.setAttribute('class', spanClass);
		span.innerText = numbers[i];
		sect.append(span);
		let block = document.createElement('div');
		block.setAttribute('class', 'block');
		sect.append(block);
		wheel.append(sect);
	}

	let pocketsRim = document.createElement('div');
	pocketsRim.setAttribute('class', 'pocketsRim');
	wheel.append(pocketsRim);

	let ballTrack = document.createElement('div');
	ballTrack.setAttribute('class', 'ballTrack');
	let ball = document.createElement('div');
	ball.setAttribute('class', 'ball');
	ballTrack.append(ball);
	wheel.append(ballTrack);

	let pockets = document.createElement('div');
	pockets.setAttribute('class', 'pockets');
	wheel.append(pockets);

	let cone = document.createElement('div');
	cone.setAttribute('class', 'cone');
	wheel.append(cone);

	let turret = document.createElement('div');
	turret.setAttribute('class', 'turret');
	wheel.append(turret);

	let turretHandle = document.createElement('div');
	turretHandle.setAttribute('class', 'turretHandle');
	let thendOne = document.createElement('div');
	thendOne.setAttribute('class', 'thendOne');
	turretHandle.append(thendOne);
	let thendTwo = document.createElement('div');
	thendTwo.setAttribute('class', 'thendTwo');
	turretHandle.append(thendTwo);
	wheel.append(turretHandle);

	container.append(wheel);
}

function buildBettingBoard(){
	let bettingBoard = document.createElement('div');
	bettingBoard.setAttribute('id', 'betting_board');

	let wl = document.createElement('div');
	wl.setAttribute('class', 'winning_lines');
	
	var wlttb = document.createElement('div');
	wlttb.setAttribute('id', 'wlttb_top');
	wlttb.setAttribute('class', 'wlttb');
	for(i = 0; i < 11; i++){
		let j = i;
		var ttbbetblock = document.createElement('div');
		ttbbetblock.setAttribute('class', 'ttbbetblock');
		var numA = (1 + (3 * j));
		var numB = (2 + (3 * j));
		var numC = (3 + (3 * j));
		var numD = (4 + (3 * j));
		var numE = (5 + (3 * j));
		var numF = (6 + (3 * j));
		let num = numA + ', ' + numB + ', ' + numC + ', ' + numD + ', ' + numE + ', ' + numF;
		var objType = 'double_street';
		ttbbetblock.onclick = function(){
			setBet(this, num, objType, 5);
		};
		ttbbetblock.oncontextmenu = function(e){
			e.preventDefault();
			removeBet(this, num, objType, 5);
		};
		wlttb.append(ttbbetblock);
	}
	wl.append(wlttb);

	for(c =  1; c < 4; c++){
		let d = c;
		var wlttb = document.createElement('div');
		wlttb.setAttribute('id', 'wlttb_'+c);
		wlttb.setAttribute('class', 'wlttb');
		for(i = 0; i < 12; i++){
			let j = i;
			var ttbbetblock = document.createElement('div');
			ttbbetblock.setAttribute('class', 'ttbbetblock');
			ttbbetblock.onclick = function(){
				if(d == 1 || d == 2){
					var numA = ((2 - (d - 1)) + (3 * j));
					var numB = ((3 - (d - 1)) + (3 * j));
					var num = numA + ', ' + numB;
				}
				else{
					var numA = (1 + (3 * j));
					var numB = (2 + (3 * j));
					var numC = (3 + (3 * j));
					var num = numA + ', ' + numB + ', ' + numC;
				}
				var objType = (d == 3)? 'street' : 'split';
				var odd = (d == 3)? 11 : 17;
				setBet(this, num, objType, odd);
			};
			ttbbetblock.oncontextmenu = function(e){
				e.preventDefault();
				if(d == 1 || d == 2){
					var numA = ((2 - (d - 1)) + (3 * j));
					var numB = ((3 - (d - 1)) + (3 * j));
					var num = numA + ', ' + numB;
				}
				else{
					var numA = (1 + (3 * j));
					var numB = (2 + (3 * j));
					var numC = (3 + (3 * j));
					var num = numA + ', ' + numB + ', ' + numC;
				}
				var objType = (d == 3)? 'street' : 'split';
				var odd = (d == 3)? 11 : 17;
				removeBet(this, num, objType, odd);
			};
			wlttb.append(ttbbetblock);
		}
		wl.append(wlttb);
	}

	for(c = 1; c < 12; c++){
		let d = c;
		var wlrtl = document.createElement('div');
		wlrtl.setAttribute('id', 'wlrtl_'+c);
		wlrtl.setAttribute('class', 'wlrtl');
		for(i = 1; i < 4; i++){
			let j = i;
			var rtlbb = document.createElement('div');
			rtlbb.setAttribute('class', 'rtlbb'+i);
			var numA = (3 + (3 * (d - 1))) - (j - 1);
			var numB = (6 + (3 * (d - 1))) - (j - 1);
			let num = numA + ', ' + numB;
			rtlbb.onclick = function(){
				setBet(this, num, 'split', 17);
			};
			rtlbb.oncontextmenu = function(e){
				e.preventDefault();
				removeBet(this, num, 'split', 17);
			};
			wlrtl.append(rtlbb);
		}
		wl.append(wlrtl);
	}
	
	for(c = 1; c < 3; c++){
		var wlcb = document.createElement('div');
		wlcb.setAttribute('id', 'wlcb_'+c);
		wlcb.setAttribute('class', 'wlcb');
		for(i = 1; i < 12; i++){
			let count = (c == 1)? i : i + 11;
			var cbbb = document.createElement('div');
			cbbb.setAttribute('id', 'cbbb_'+count);
			cbbb.setAttribute('class', 'cbbb');
			var numA = '2';
			var numB = '3';
			var numC = '5';
			var numD = '6';
			let num = (count >= 1 && count < 12)? (parseInt(numA) + ((count - 1) * 3)) + ', ' + (parseInt(numB)+((count - 1) * 3)) + ', ' + (parseInt(numC)+((count - 1) * 3)) + ', ' + (parseInt(numD)+((count - 1) * 3)) : ((parseInt(numA) - 1) + ((count - 12) * 3)) + ', ' + ((parseInt(numB) - 1)+((count - 12) * 3)) + ', ' + ((parseInt(numC) - 1)+((count - 12) * 3)) + ', ' + ((parseInt(numD) - 1)+((count - 12) * 3));
			var objType = 'corner_bet';
			cbbb.onclick = function(){
				setBet(this, num, objType, 8);
			};
			cbbb.oncontextmenu = function(e){
				e.preventDefault();
				removeBet(this, num, objType, 8);
			};
			wlcb.append(cbbb);
		}
		wl.append(wlcb);
	}

	bettingBoard.append(wl);

	let bbtop = document.createElement('div');
	bbtop.setAttribute('class', 'bbtop');
	let bbtopBlocks = ['1 to 18', '19 to 36'];
	for(i = 0; i < bbtopBlocks.length; i++){
		let f = i;
		var bbtoptwo = document.createElement('div');
		bbtoptwo.setAttribute('class', 'bbtoptwo');
		let num = (f == 0)? '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18' : '19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36';
		var objType = (f == 0)? 'outside_low' : 'outside_high';
		bbtoptwo.onclick = function(){
			setBet(this, num, objType, 1);
		};
		bbtoptwo.oncontextmenu = function(e){
			e.preventDefault();
			removeBet(this, num, objType, 1);
		};
		bbtoptwo.innerText = bbtopBlocks[i];
		bbtop.append(bbtoptwo);
	}
	bettingBoard.append(bbtop);

	let numberBoard = document.createElement('div');
	numberBoard.setAttribute('class', 'number_board');

	let zero = document.createElement('div');
	zero.setAttribute('class', 'number_0');
	var objType = 'zero';
	var odds = 35;
	zero.onclick = function(){
		setBet(this, '0', objType, odds);
	};
	zero.oncontextmenu = function(e){
		e.preventDefault();
		removeBet(this, '0', objType, odds);
	};
	let nbnz = document.createElement('div');
	nbnz.setAttribute('class', 'nbn');
	nbnz.innerText = '0';
	zero.append(nbnz);
	numberBoard.append(zero);
	
	var numberBlocks = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, '2 to 1', 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, '2 to 1', 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, '2 to 1'];
	var redBlocks = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
	for(i = 0; i < numberBlocks.length; i++){
		let a = i;
		var nbClass = (numberBlocks[i] == '2 to 1')? 'tt1_block' : 'number_block';
		var colourClass = (redBlocks.includes(numberBlocks[i]))? ' redNum' : ((nbClass == 'number_block')? ' blackNum' : '');
		var numberBlock = document.createElement('div');
		numberBlock.setAttribute('class', nbClass + colourClass);
		numberBlock.onclick = function(){
			if(numberBlocks[a] != '2 to 1'){
				setBet(this, ''+numberBlocks[a]+'', 'inside_whole', 35);
			}else{
				num = (a == 12)? '3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36' : ((a == 25)? '2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35' : '1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34');
				setBet(this, num, 'outside_column', 2);
			}
		};
		numberBlock.oncontextmenu = function(e){
			e.preventDefault();
			if(numberBlocks[a] != '2 to 1'){
				removeBet(this, ''+numberBlocks[a]+'', 'inside_whole', 35);
			}else{
				num = (a == 12)? '3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36' : ((a == 25)? '2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35' : '1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34');
				removeBet(this, num, 'outside_column', 2);
			}
		};
		var nbn = document.createElement('div');
		nbn.setAttribute('class', 'nbn');
		nbn.innerText = numberBlocks[i];
		numberBlock.append(nbn);
		numberBoard.append(numberBlock);
	}
	bettingBoard.append(numberBoard);

	let bo3Board = document.createElement('div');
	bo3Board.setAttribute('class', 'bo3_board');	
	let bo3Blocks = ['1 to 12', '13 to 24', '25 to 36'];
	for(i = 0; i < bo3Blocks.length; i++){
		let b = i;
		var bo3Block = document.createElement('div');
		bo3Block.setAttribute('class', 'bo3_block');
		bo3Block.onclick = function(){
			num = (b == 0)? '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12' : ((b == 1)? '13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24' : '25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36');
			setBet(this, num, 'outside_dozen', 2);
		};
		bo3Block.oncontextmenu = function(e){
			e.preventDefault();
			num = (b == 0)? '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12' : ((b == 1)? '13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24' : '25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36');
			removeBet(this, num, 'outside_dozen', 2);
		};
		bo3Block.innerText = bo3Blocks[i];
		bo3Board.append(bo3Block);
	}
	bettingBoard.append(bo3Board);

	let otoBoard = document.createElement('div');
	otoBoard.setAttribute('class', 'oto_board');	
	let otoBlocks = ['EVEN', 'RED', 'BLACK', 'ODD'];
	for(i = 0; i < otoBlocks.length; i++){
		let d = i;
		var colourClass = (otoBlocks[i] == 'RED')? ' redNum' : ((otoBlocks[i] == 'BLACK')? ' blackNum' : '');
		var otoBlock = document.createElement('div');
		otoBlock.setAttribute('class', 'oto_block' + colourClass);
		otoBlock.onclick = function(){
			num = (d == 0)? '2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36' : ((d == 1)? '1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36' : ((d == 2)? '2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35' : '1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35'));
			setBet(this, num, 'outside_oerb', 1);
		};
		otoBlock.oncontextmenu = function(e){
			num = (d == 0)? '2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36' : ((d == 1)? '1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36' : ((d == 2)? '2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35' : '1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35'));
			e.preventDefault();
			removeBet(this, num, 'outside_oerb', 1);
		};
		otoBlock.innerText = otoBlocks[i];
		otoBoard.append(otoBlock);
	}
	bettingBoard.append(otoBoard);

	let chipDeck = document.createElement('div');
	chipDeck.setAttribute('class', 'chipDeck');
	let chipValues = [1, 5, 10, 100, 'clear'];
	for(i = 0; i < chipValues.length; i++){
		let cvi = i;
		let chipColour = (i == 0)? 'red' : ((i == 1)? 'blue cdChipActive' : ((i == 2)? 'orange' : ((i == 3)? 'gold' : 'clearBet')));
		let chip = document.createElement('div');
		chip.setAttribute('class', 'cdChip ' + chipColour);
		chip.onclick = function(){
			if(cvi !== 4){
				let cdChipActive = document.getElementsByClassName('cdChipActive');
				for(i = 0; i < cdChipActive.length; i++){
					cdChipActive[i].classList.remove('cdChipActive');
				}
				let curClass = this.getAttribute('class');
				if(!curClass.includes('cdChipActive')){
					this.setAttribute('class', curClass + ' cdChipActive');
				}
				wager = parseInt(chip.childNodes[0].innerText);
			}else{
				bankValue = bankValue + currentBet;
				currentBet = 0;
				document.getElementById('bankSpan').innerText = '' + bankValue.toLocaleString("en-GB") + '';
				document.getElementById('betSpan').innerText = '' + currentBet.toLocaleString("en-GB") + '';
				clearBet();
				removeChips();
			}
		};
		let chipSpan = document.createElement('span');
		chipSpan.setAttribute('class', 'cdChipSpan');
		chipSpan.innerText = chipValues[i];
		chip.append(chipSpan);
		chipDeck.append(chip);
	}
	bettingBoard.append(chipDeck);

	let bankContainer = document.createElement('div');
	bankContainer.setAttribute('class', 'bankContainer');

	let bank = document.createElement('div');
	bank.setAttribute('class', 'bank');
	let bankSpan = document.createElement('span');
	bankSpan.setAttribute('id', 'bankSpan');
	bankSpan.innerText = '' + bankValue.toLocaleString("en-GB") + '';
	bank.append(bankSpan);
	bankContainer.append(bank);

	let bet = document.createElement('div');
	bet.setAttribute('class', 'bet');
	let betSpan = document.createElement('span');
	betSpan.setAttribute('id', 'betSpan');
	betSpan.innerText = '' + currentBet.toLocaleString("en-GB") + '';
	bet.append(betSpan);
	bankContainer.append(bet);	
	bettingBoard.append(bankContainer);

	let pnBlock = document.createElement('div');
	pnBlock.setAttribute('class', 'pnBlock');
	let pnContent = document.createElement('div');
	pnContent.setAttribute('id', 'pnContent');
	pnContent.onwheel = function(e){
		e.preventDefault();
		pnContent.scrollLeft += e.deltaY;
	};
	pnBlock.append(pnContent);	
	bettingBoard.append(pnBlock);
	
	container.append(bettingBoard);
}

function clearBet(){
	bet = [];
	numbersBet = [];
}

function setBet(e, n, t, o){
	lastWager = wager;
	wager = (bankValue < wager)? bankValue : wager;
	if(wager > 0){
		if(!container.querySelector('.spinBtn')){
			let spinBtn = document.createElement('div');
			spinBtn.setAttribute('class', 'spinBtn');
			spinBtn.innerText = 'spin';
			spinBtn.onclick = function(){
				this.remove();
				spin();
			};
			container.append(spinBtn);
		}
		bankValue = bankValue - wager;
		currentBet = currentBet + wager;
		document.getElementById('bankSpan').innerText = '' + bankValue.toLocaleString("en-GB") + '';
		document.getElementById('betSpan').innerText = '' + currentBet.toLocaleString("en-GB") + '';
		for(i = 0; i < bet.length; i++){
			if(bet[i].numbers == n && bet[i].type == t){
				bet[i].amt = bet[i].amt + wager;
				let chipColour = (bet[i].amt < 5)? 'red' : ((bet[i].amt < 10)? 'blue' : ((bet[i].amt < 100)? 'orange' : 'gold'));
				e.querySelector('.chip').style.cssText = '';
				e.querySelector('.chip').setAttribute('class', 'chip ' + chipColour);
				let chipSpan = e.querySelector('.chipSpan');
				chipSpan.innerText = bet[i].amt;
				return;
			}
		}
		var obj = {
			amt: wager,
			type: t,
			odds: o,
			numbers: n
		};
		bet.push(obj);
		
		let numArray = n.split(',').map(Number);
		for(i = 0; i < numArray.length; i++){
			if(!numbersBet.includes(numArray[i])){
				numbersBet.push(numArray[i]);
			}
		}

		if(!e.querySelector('.chip')){
			let chipColour = (wager < 5)? 'red' : ((wager < 10)? 'blue' : ((wager < 100)? 'orange' : 'gold'));
			let chip = document.createElement('div');
			chip.setAttribute('class', 'chip ' + chipColour);
			let chipSpan = document.createElement('span');
			chipSpan.setAttribute('class', 'chipSpan');
			chipSpan.innerText = wager;
			chip.append(chipSpan);
			e.append(chip);
		}
	}
}

function spin(){
	var winningSpin = Math.floor(Math.random() * 37);
	spinWheel(winningSpin);
	setTimeout(function(){
		if(numbersBet.includes(winningSpin)){
			let winValue = 0;
			let betTotal = 0;
			for(i = 0; i < bet.length; i++){
				var numArray = bet[i].numbers.split(',').map(Number);
				if(numArray.includes(winningSpin)){
					bankValue = (bankValue + (bet[i].odds * bet[i].amt) + bet[i].amt);
					winValue = winValue + (bet[i].odds * bet[i].amt);
					betTotal = betTotal + bet[i].amt;
				}
			}
			win(winningSpin, winValue, betTotal);
		}

		currentBet = 0;
		document.getElementById('bankSpan').innerText = '' + bankValue.toLocaleString("en-GB") + '';
		document.getElementById('betSpan').innerText = '' + currentBet.toLocaleString("en-GB") + '';
		
		let pnClass = (numRed.includes(winningSpin))? 'pnRed' : ((winningSpin == 0)? 'pnGreen' : 'pnBlack');
		let pnContent = document.getElementById('pnContent');
		let pnSpan = document.createElement('span');
		pnSpan.setAttribute('class', pnClass);
		pnSpan.innerText = winningSpin;
		pnContent.append(pnSpan);
		pnContent.scrollLeft = pnContent.scrollWidth;

		bet = [];
		numbersBet = [];
		removeChips();
		wager = lastWager;
		if(bankValue == 0 && currentBet == 0){
			gameOver();
		}
	}, 10000);
}

function win(winningSpin, winValue, betTotal){
	if(winValue > 0){
		let notification = document.createElement('div');
		notification.setAttribute('id', 'notification');
			let nSpan = document.createElement('div');
			nSpan.setAttribute('class', 'nSpan');
				let nsnumber = document.createElement('span');
				nsnumber.setAttribute('class', 'nsnumber');
				nsnumber.style.cssText = (numRed.includes(winningSpin))? 'color:red' : 'color:black';
				nsnumber.innerText = winningSpin;
				nSpan.append(nsnumber);
				let nsTxt = document.createElement('span');
				nsTxt.innerText = ' Win';
				nSpan.append(nsTxt);
				let nsWin = document.createElement('div');
				nsWin.setAttribute('class', 'nsWin');
					let nsWinBlock = document.createElement('div');
					nsWinBlock.setAttribute('class', 'nsWinBlock');
					nsWinBlock.innerText = 'Bet: ' + betTotal;
					nSpan.append(nsWinBlock);
					nsWin.append(nsWinBlock);
					nsWinBlock = document.createElement('div');
					nsWinBlock.setAttribute('class', 'nsWinBlock');
					nsWinBlock.innerText = 'Win: ' + winValue;
					nSpan.append(nsWinBlock);
					nsWin.append(nsWinBlock);
					nsWinBlock = document.createElement('div');
					nsWinBlock.setAttribute('class', 'nsWinBlock');
					nsWinBlock.innerText = 'Payout: ' + (winValue + betTotal);
					nsWin.append(nsWinBlock);
				nSpan.append(nsWin);
			notification.append(nSpan);
		container.prepend(notification);
		setTimeout(function(){
			notification.style.cssText = 'opacity:0';
		}, 3000);
		setTimeout(function(){
			notification.remove();
		}, 4000);
	}
}

function removeBet(e, n, t, o){
	wager = (wager == 0)? 100 : wager;
	for(i = 0; i < bet.length; i++){
		if(bet[i].numbers == n && bet[i].type == t){
			if(bet[i].amt != 0){
				wager = (bet[i].amt > wager)? wager : bet[i].amt;
				bet[i].amt = bet[i].amt - wager;
				bankValue = bankValue + wager;
				currentBet = currentBet - wager;
				document.getElementById('bankSpan').innerText = '' + bankValue.toLocaleString("en-GB") + '';
				document.getElementById('betSpan').innerText = '' + currentBet.toLocaleString("en-GB") + '';
				if(bet[i].amt == 0){
					e.querySelector('.chip').style.cssText = 'display:none';
				}else{
					let chipColour = (bet[i].amt < 5)? 'red' : ((bet[i].amt < 10)? 'blue' : ((bet[i].amt < 100)? 'orange' : 'gold'));
					e.querySelector('.chip').setAttribute('class', 'chip ' + chipColour);
					let chipSpan = e.querySelector('.chipSpan');
					chipSpan.innerText = bet[i].amt;
				}
			}
		}
	}

	if(currentBet == 0 && container.querySelector('.spinBtn')){
		document.getElementsByClassName('spinBtn')[0].remove();
	}
}

function spinWheel(winningSpin){
	for(i = 0; i < wheelnumbersAC.length; i++){
		if(wheelnumbersAC[i] == winningSpin){
			var degree = (i * 9.73) + 362;
		}
	}
	wheel.style.cssText = 'animation: wheelRotate 5s linear infinite;';
	ballTrack.style.cssText = 'animation: ballRotate 1s linear infinite;';

	setTimeout(function(){
		ballTrack.style.cssText = 'animation: ballRotate 2s linear infinite;';
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerText = '@keyframes ballStop {from {transform: rotate(0deg);}to{transform: rotate(-'+degree+'deg);}}';
		document.head.appendChild(style);
	}, 2000);
	setTimeout(function(){
		ballTrack.style.cssText = 'animation: ballStop 3s linear;';
	}, 6000);
	setTimeout(function(){
		ballTrack.style.cssText = 'transform: rotate(-'+degree+'deg);';
	}, 9000);
	setTimeout(function(){
		wheel.style.cssText = '';
		style.remove();
	}, 10000);
}

function removeChips(){
	var chips = document.getElementsByClassName('chip');
	if(chips.length > 0){
		for(i = 0; i < chips.length; i++){
			chips[i].remove();
		}
		removeChips();
	}
}