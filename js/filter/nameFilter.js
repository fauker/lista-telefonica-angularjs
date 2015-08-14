angular.module("listaTelefonica").filter("name", function () {
	return function (input) {
		return input;
	};
});