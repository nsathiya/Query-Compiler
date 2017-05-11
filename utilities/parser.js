
//Our dictionary to keep track of possible syntax and mappings to thier functions
var dict = {
  ">": function(e){
    return ({
      "$gt":parse(e)
    })
  },
  "<": function(e){
    return ({
      "$lt":parse(e)
    })
  },
  ">=": function(e){
    return ({
      "$gte":parse(e)
    })
  },
  "<=": function(e){
    return ({
      "$lte":parse(e)
    })
  },
  "=": function(e){
    return ({
      "$eq":parse(e)
    })
  },
  "\"": function(e){
    e = e.slice(0,-1);
    return ({
      "$quoted":parse(e)
    })
  },
  "!": function(e){
    return ({
      "$not":parse(e)
    })
  },
  "len(": function(e){
    e = e.slice(0,-1);
    return ({
      "$len": parse(e)
    })
  },
  "OR": function(l, r){
    return ({
      "$or": [l, r]
    })
  },
  "AND": function(l, r){
    return ({
      "$and": [l, r]
    })
  }
}

//parse lower end terms recursively (ex. each individual token will be parsed here)
var parse = function (_t){
  var testString = _t;
  var parsed = _t;

  if (dict[testString.slice(0,4)]) //for len() keyword
    parsed = dict[testString.slice(0,4)](testString.slice(4));
  else if (dict[testString.slice(0,2)]) //for >= or <=
    parsed = dict[testString.slice(0,2)](testString.slice(2));
  else if (dict[testString[0]]) //for everything else
    parsed = dict[testString[0]](testString.slice(1));

  return parsed;
}

//Gets the next full token
var nextToken = function(_s){

  if (_s == undefined || _s == "")
    return null;

  var cleaned = _s.trim();
  var stringFlag = false;
  //if only token, the whole token will be returned
  var j=cleaned.length;

  for (var i=0; i < cleaned.length; i++){
    if (cleaned[i] == '"')
      stringFlag = !stringFlag;

    if (cleaned[i] == " " && !stringFlag){
      j = i;
      break;
    }
  }
  return [cleaned.slice(0,j), cleaned.slice(j).trim()];

}

//Using our stack, perform the right AND or OR function
var lexerBuild = function(stack){
  if (stack.length == 1){
   var e = stack.pop();
   result = e;
  } else {
    var e_right = stack.pop();
    var e = stack.pop();
    if (e == "OR" || e == "AND"){
      var e_left = stack.pop();
      result = dict[e](e_left, e_right);
    } else {
      //implicit AND
      result = dict["AND"](e, e_right);
    }
  }
  return result;
}

//Main parse function. Goes through each token and parses bottom up
var parseString = function(t){
  var stack = [];
  var result = "";
  try {
    while(nextToken(t)){
      var temp = nextToken(t);
      if (temp[0] == ")"){
        result = lexerBuild(stack)
        stack.push(result);
      } else if (temp[0] != "(") {
        if (temp[0] != "AND" && temp[0] != "OR")
          stack.push(parse(temp[0]));
        else
          stack.push(temp[0]);
      }
      t = temp[1];
    }

    //console.log(stack);
    while(stack.length>0){
      result = lexerBuild(stack);
      //console.log(stack);
    }
    //console.log(result);
    return result;
  } catch(err){
    throw new Error(err);
  }
}

module.exports.parseString = parseString;
