var testObject = {
    prop1: 'test1',
    prop2: 'test2',
    prop3: 'test3'
};

Object.keys(testObject).forEach(function(propertyName, i) {
    setTimeout(function() {
        console.log(testObject[propertyName]);
    }, i * 1000);
});