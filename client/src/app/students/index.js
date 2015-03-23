angular.module( 'students', [
    'templates',
    'ui.router',
]).config([
    '$stateProvider',
    function config( $stateProvider) {

        $stateProvider.state({
            name: 'students',
            url: '/',
            views: {
                'main': {
                    controller:'StudentsController',
                    templateUrl: 'students/templates/students.tpl.html'
                }
            }
        });
    }
]).controller( 'StudentsController',[
    '$scope',
    '$filter',
    'ngTableParams',
    'Restangular',
    function StudentsController($scope, $filter, ngTableParams, Restangular) {
        $scope.newStudent = {};

        var students = Restangular.all('students');

        // This will query /accounts and return a promise.
        students.getList().then(
            function(students) {
                /* jshint ignore:start */
                $scope.tableParams = new ngTableParams({
                    page: 1,
                    count: 10
                },{
                    total: students.length,
                    getData: function($defer, params) {
                        var orderedData = params.sorting() ? $filter('orderBy')(students, params.orderBy()) : students;
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
                /* jshint ignore:end */
            }
        );

        $scope.editId = -1;
        $scope.createId = -1;

        $scope.createStudent = function() {
            students.post($scope.newStudent).then(
                function() {
                    console.log('Student Created');
                    $scope.newStudent = {};
                    $scope.createId = -1;
                },
                function() {
                    console.error('Save Failed');
                }
            );
        };


        $scope.updateStudent = function(student) {
            console.log('Update Student', student, students);
            student.put().then(
                function() {
                    console.log('student updated');
                    $scope.setEditId(-1);
                },
                function() {
                    console.error('put failed');
                    $scope.setEditId(-1);
                }
            );
        };

        $scope.setEditId =  function(pid) {
            $scope.editId = pid;
        };

        $scope.setCreateId =  function(pid) {
            console.log('set create id');
            $scope.createId = pid;
        };
    }
]);