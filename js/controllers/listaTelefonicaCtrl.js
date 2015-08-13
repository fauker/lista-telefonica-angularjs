angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http, contatosAPI) {
	$scope.app = "Lista Telefonica";
	$scope.contatos = [];

	$scope.operadoras = [
		{nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
		{nome: "Vivo", codigo: 15, categoria: "Celular", preco: 3},
		{nome: "Tim", codigo: 41, categoria: "Celular", preco: 4},
		{nome: "GVT", codigo: 41, categoria: "Fixo", preco: 5},
		{nome: "Embratel", codigo: 41, categoria: "Fixo", preco: 26}
	];

	var carregarContatos = function () {
		contatosAPI.getContatos().success(function (data) {
			$scope.contatos = data;
		}).error(function (data) {
			$scope.message = "Aconteceu um problema" +  data;
		});
	}

	var carregarOperadoras = function () {
		$http.get("http://localhost:3412/operadoras").success(function (data) {
			$scope.operadoras = data;
		})
	}

	$scope.classe1 = "selecionado";
	$scope.classe2 = "negrito";
	$scope.adicionarContato = function (contato) {
		$http.post("http://localhost:3412/contatos", contato).success(function (data){
			delete $scope.contato;
			$scope.contatoForm.$setPristine();					
			carregarContatos();
		});

	};
	$scope.apagarContatos = function (contatos) {
		$scope.contatos = contatos.filter(function (contatos) {
			if (!contatos.selecionado) return contatos;
		});
	}
	$scope.isContatoSelecionado = function (contatos) {
		return contatos.some(function (contatos) {
			return contatos.selecionado;
		});
	}
	$scope.ordernarPor =  function (campo) {
		$scope.criterioDeOrdenacao = campo;
	}

	carregarContatos();
	carregarOperadoras();
});