var Car = function() {
    this.color = 'red';
    
    this.make = 'Ford';
    
    this.drive = function() {
        return 'driving...';
    },
    
    this.paint = function(color, callback) {
        var carContext = this;
        
        setTimeout(function() {
            carContext.color = color;
            
            callback();
        }, 2000);
    }
}