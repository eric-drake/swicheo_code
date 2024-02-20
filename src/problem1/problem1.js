//Since n is to be integer, i assume that if n was negative, thye sum will be adding from -1 to n. eg, if n = -3, the sum will be -1 + -2 + -3 = -6
var sum_to_n_a = function(n) {
    var sum = 0;
    if(n >=0){
        for(var i =1; i<=n; i++){
            sum += i;
        }
    }else{
        for(var i = -1; i>=n; i--){
            sum += i;
        }
    }
};

var sum_to_n_b = function(n) {
    if(n >=0){
        return n * ((n +1) /2);
    }else{
        return n * ((n - 1) / -2);
    }
};

var sum_to_n_c = function(n) {
    if (n >= 0) {
        if (n === 0) {
            return 0;
        } else {
            return n + sum_to_n_c(n - 1);
        }
    } else {
        if (n === -1) {
            return -1;
        } else {
            return n + sum_to_n_c(n + 1);
        }
    }
};
