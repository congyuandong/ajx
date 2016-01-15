$(document).ready(function() {
	var reduceAdult = $(".reduce")[0],
		textAdult = $(".text")[0],
		addAdult = $(".add")[0],
		reduceKid = $(".reduce")[1],
		textKid = $(".text")[1],
		addKid = $(".add")[1],
		
		countAdult = 1,
		countKid = 0;
			
	start = function (reduce, text, add, count) {
		less = function () {
			if (parseInt(text.value) > 0) {
				count -= 1;
				text.value = count;
				
			}
		},
		increase = function () {
				count += 1;
				text.value = count;
		};

		reduce.onclick = increase;
		add.onclick = less;
	};

	start(reduceAdult, textAdult, addAdult, countAdult);
	start(reduceKid, textKid, addKid, countKid);
});