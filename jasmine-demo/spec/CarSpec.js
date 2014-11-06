describe('Car', function() {
    var car;
    
    beforeEach(function() {
        car = new Car(); 
    });
    
    describe('color', function() {
        it('should be red', function() {
            expect(car.color).toBe('red');
        });
    });
    
    describe('make', function() {
        it('should be Ford', function() {
            expect(car.make).toBe('Ford');
        });
    });
    
    describe('drive()', function() {
        it('should return driving...', function() {
            expect(car.drive()).toBe('driving...');
        });
    });
    
    describe('paint()', function() {
        beforeEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
        });
        
        it('should paint the car blue', function(done) {
            car.paint('blue', function() {
                expect(car.color).toBe('blue');
                
                done();
            });
        });
    });
});