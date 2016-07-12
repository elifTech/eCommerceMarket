export default
/*@ngInject@*/
($StateProvider, $UrlRouterProvider) => {
    $UrlRouterProvider.otherwise($inject => {
        var $state = $inject.get('$state');
        $state.go('main.index');
    });

    $StateProvider
        .state('private', {
            abstract: true,
            views: {
                'index': {
                    templateUrl: './main.html'
                }
            }
        })
        .state('main', {
            parent: 'private',
            abstract: true,
            url: '',
            views: {
                'master-view': {
                    templateUrl: './content.html'
                }
            }
        });
}