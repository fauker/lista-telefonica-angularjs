angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, contatosAPI, operadorasAPI) {
	$scope.app = "Lista Telefonica";
	$scope.contatos = [];

	$scope.operadoras = [];

	var carregarContatos = function () {
		contatosAPI.getContatos().success(function (data) {
			$scope.contatos = data;
		}).error(function (data) {
			$scope.error = "Não foi possível carregar os dados!";
		});
	}

	var carregarOperadoras = function () {
		operadorasAPI.getOperadoras().success(function (data) {
			$scope.operadoras = data;
		})
	}

	$scope.classe1 = "selecionado";
	$scope.classe2 = "negrito";
	$scope.adicionarContato = function (contato) {
		contatosAPI.saveContato(contato).success(function (data) {
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