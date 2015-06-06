$(function() {
    var grid = new DataTablesGrid("grid");
    grid.load("php/?controller=Gallery;getData");
});