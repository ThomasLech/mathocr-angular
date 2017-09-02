app
    .controller('cameraPreviewCtrl', ['$scope', '$state', '$document', '$http', 'pictureService', function($scope, $state, $document, $http, pictureService) {

        $scope.flash_mode = CameraPreview.FLASH_MODE.OFF;

        // Absolute paths to icons
        $scope.flash_on_icon = 'img/flash_on.svg';
        $scope.flash_off_icon = 'img/flash_off.svg';
        $scope.take_pic_icon = 'img/btn_icon5.png';

        // Rectangle element reference
        var rect = document.getElementsByClassName('rectangle')[0];

        $scope.takePicture = function() {

            // Get rectangle size
            var rect_width = rect.offsetWidth, rect_height = rect.offsetHeight;

            // Get rectangle coordinates
            var rect_coords = rect.getBoundingClientRect();
            var x_coord = rect_coords.left, y_coord = rect_coords.top;
            // $state.go('resultsPanel', {'results': '2x+b'});
            CameraPreview.takePicture(function(base64_img) {

                pictureService.crop(base64_img, rect_width, rect_height, x_coord, y_coord).then(

                    function successCallback(cropped_base64_img) {

                        pictureService.send(cropped_base64_img).then(

                            function successCallback(response) {

                                var results = response.data;
                                // Do sth with results
                                $state.go('resultsPanel', {'results': results});
                            },
                            function errorCallback(error) {
                                alert('status:' + error.status + '\nstatusText:' + error.statusText);
                            }
                        );
                    },
                    function errorCallback(error) {
                        alert(error);
                    }
                );
            });
        };

        $scope.changeFlashMode = function() {

            // Trigger flash mode
            if ($scope.flash_mode === CameraPreview.FLASH_MODE.OFF) {
                $scope.flash_mode = CameraPreview.FLASH_MODE.ON;
            } else {
                $scope.flash_mode = CameraPreview.FLASH_MODE.OFF;
            }
            // Set flash mode
            CameraPreview.setFlashMode($scope.flash_mode);
        };
    }])
    .controller('resultsPanelCtrl', ['$scope', '$stateParams', 'plotService', function($scope, $stateParams, plotService) {

        // Retrieve prediction that was passed from cameraPreview state
        $scope.results = $stateParams.results;
        // $scope.results = {
        //     'computations': [
        //         {'name': 'test', 'result': '2x+1'},
        //         {'name': 'test', 'result': '$$x = {-b2a}.$$'},
        //         {'name': 'test', 'result': 'When $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and they are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$'},
        //         {'name': 'test', 'result': '2x+1'},
        //         {'name': 'test', 'result': '2x+1'},
        //         {'name': 'test', 'result': '2x+1'},
        //         {'name': 'test', 'result': '2x+1'},
        //         {'name': 'test', 'result': '2x+1'},
        //         {'name': 'test', 'result': '2x+1'},
        //     ],
        //     // 'plot': 'https://www5a.wolframalpha.com/Calculate/MSP/MSP207129e77f4ae93d9h500002g7793914ihee6e7?MSPStoreType=image/gif&s=13'
        // };

        // // Generate plot
        // plotService.generate_plot2D("x**3", -50, 100).then(
        //     function successCallback(plot_data) {
        //         var plot_dest = document.getElementById('plot');
        //         Plotly.plot(plot_dest, plot_data.graph, plot_data.layout);
        //     },
        //     function errorCallback(error) {}
        // );
    }]);
