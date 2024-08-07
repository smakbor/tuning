export const checkPermission = (routes, permissions, user, settingData) => {
  // CHECK ROLES
  return routes.reduce((acc, route) => {
    if (!permissions && route?.roles?.includes(user?.role)) {
      let filteredRoute = { ...route };

      // Recursively filter child routes
      if (route.children) {
        filteredRoute.children = checkPermission(route.children, permissions, user, settingData);
      }
      return acc;
    } else {
      // Checking based on roles
      if (Array.isArray(route.roles)) {
        if (!route.roles?.includes(user?.role)) return acc;
      }

      //Checking based on permission key
      if (!permissions?.[route?.permissionKey] && route.permissionKey) {
        return acc;
      }
      const filteredRoute = { ...route };

      // Recursively filter child routes
      if (route.children) {
        filteredRoute.children = checkPermission(route.children, permissions, user, settingData);
      }

      //Checking with Router and without Router
      if (settingData?.hasRouter) {
        if (filteredRoute.isShown !== 'withoutRouter') {
          acc.push(filteredRoute);
        }
      } else {
        if (filteredRoute.isShown !== 'withRouter') {
          acc.push(filteredRoute);
        }
      }
      // Pushing filtered route

      // acc.push(filteredRoute);
      return acc;
    }
  }, []);
};
