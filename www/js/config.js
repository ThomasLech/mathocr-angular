app
    .config(function($urlRouterProvider, $stateProvider) {

        $stateProvider
            .state('cameraPreview', {
                url: '/cameraPreview',
                templateUrl: 'templates/cameraPreview.html',
                controller: 'cameraPreviewCtrl',
                resolve: {
                    startCameraPreview: function() {

                        var options = {
                            x: 0,
                            y: 0,
                            width: window.screen.width,
                            height: window.screen.height,
                            camera: CameraPreview.CAMERA_DIRECTION.BACK,  // Front/back camera
                            toBack: true,   // Set to true if you want your html in front of your preview
                            tapPhoto: false,  // Tap to take photo
                            tapFocus: true,   // Tap to focus
                            previewDrag: false
                        };

                        // Take a look at docs: https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview#methods
                        // Start camera preview activity
                        CameraPreview.startCamera(options);
                    }
                }
            })
            .state('resultsPanel', {
                url: '/resultsPanel',
                params: {results: null},
                templateUrl: 'templates/resultsPanel.html',
                controller: 'resultsPanelCtrl',
                resolve: {
                    stopCameraPreview: function() {
                        // Stop cameraPreview activity
                        CameraPreview.stopCamera();
                    }
                }
            });

        $urlRouterProvider
            .otherwise('/cameraPreview');
    });
