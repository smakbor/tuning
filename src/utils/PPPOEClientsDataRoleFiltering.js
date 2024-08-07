export const getUserRoleData = (data, packages, otherPackages) => {
  return data?.clients?.reduce((acc, curr) => {
    if (curr) {
      const findPackage = packages?.find((item) => item.package === curr?.package);
      const otherFindPackage = otherPackages?.find((item) => item.package === curr?.package);

      if (findPackage || otherFindPackage) {
        acc.push({
          ...curr,
          fee:
            findPackage?.packagePrice ||
            findPackage?.merchantRate ||
            otherFindPackage?.packagePrice ||
            otherFindPackage?.resellerRate ||
            curr?.fee,
          routerClientDetails: {
            ...curr?.routerClientDetails,
            profile: findPackage?.packageAlias?.name || otherFindPackage?.packageAlias?.name || curr?.routerClientDetails?.profile
          }
        });
      }
    }
    return acc;
  }, []);
};
