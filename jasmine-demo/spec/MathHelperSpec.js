describe('mathHelper', function() {    
    describe('add()', function() {
        it('should return 3 when called with 1,2', function() {
            expect(mathHelper.add(1,2)).toEqual(3);
        });
    });
    
    describe('summation()', function() {
        it('should return 10 when called with 4', function() {
            expect(mathHelper.summation(4)).toEqual(10);
        });
        
        it('should return 15 when called with 5', function() {
            expect(mathHelper.summation(5)).toEqual(15);
        });
    });
});