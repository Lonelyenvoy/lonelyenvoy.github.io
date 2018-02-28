---
layout: post
title: Android Camera Permission 异常行为与注意事项
date: 2018-02-28
categories: blog
tags: [开发, Android]
description: 
---

当App调用相机时，跳转到的Intent为```new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE)```。[谷歌官方文档](https://developer.android.com/reference/android/provider/MediaStore.html#ACTION_IMAGE_CAPTURE)对ACTION_IMAGE_CAPTURE的说明指出：

> 如果你的App目标版本为Marshmallow(6.0, API 23)以上，并且在```AndroidManifest.xml```中声明了相机权限：
>```xml
><uses-permission android:name="android.permission.CAMERA" />
>```
> 但该权限没有在运行时被授予的话，跳转到Camera Intent将会导致```SecurityException```。

StackTrace如下所示：
```java
java.lang.SecurityException: Permission Denial: starting Intent { act=android.media.action.IMAGE_CAPTURE cmp=android/com.android.internal.app.ResolverActivity } from ProcessRecord{e8f9820 15070:com.example.app/u0a228} (pid=15070, uid=10228) with revoked permission android.permission.CAMERA
    at android.os.Parcel.readException(Parcel.java:1620)
    at android.os.Parcel.readException(Parcel.java:1573)
    at android.app.ActivityManagerProxy.startActivity(ActivityManagerNative.java:3181)
    at android.app.Instrumentation.execStartActivity(Instrumentation.java:1541)
    at android.app.Activity.startActivityForResult(Activity.java:4298)
    at android.support.v4.app.BaseFragmentActivityJB.startActivityForResult(BaseFragmentActivityJB.java:50)
    at android.support.v4.app.FragmentActivity.startActivityForResult(FragmentActivity.java:79)
    at android.support.v4.app.ActivityCompatJB.startActivityForResult(ActivityCompatJB.java:30)
    at android.support.v4.app.ActivityCompat.startActivityForResult(ActivityCompat.java:146)
    at android.support.v4.app.FragmentActivity.startActivityFromFragment(FragmentActivity.java:937)
    at android.support.v4.app.FragmentActivity$HostCallbacks.onStartActivityFromFragment(FragmentActivity.java:1047)
    at android.support.v4.app.Fragment.startActivityForResult(Fragment.java:954)
    at android.support.v4.app.Fragment.startActivityForResult(Fragment.java:943)
    at com.example.app.Camera$1.onClick(Camera.java:51)
    at android.view.View.performClick(View.java:5716)
    at android.widget.TextView.performClick(TextView.java:10926)
    at android.view.View$PerformClick.run(View.java:22596)
    at android.os.Handler.handleCallback(Handler.java:739)
    at android.os.Handler.dispatchMessage(Handler.java:95)
    at android.os.Looper.loop(Looper.java:148)
    at android.app.ActivityThread.main(ActivityThread.java:7325)
    at java.lang.reflect.Method.invoke(Native Method)
    at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:1230)
    at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1120)
```

需要注意的是，谷歌制定的Camera Permission有着不合理的异常行为。对于API 23以上的环境，虽然声明了相机权限但未被授权的情况下会导致```SecurityException```，但如果不在```AndroidManifest.xml```中声明相机权限，则不会有任何问题。

一个较好的解决方案（尤其是在写Android library时）：先检查app的Manifest是否有声明相机权限，如果有，则在跳转到Camera Intent前[请求权限](https://developer.android.com/training/permissions/requesting.html)。

检查是否声明了权限的代码如下（无论该权限是否已被授予）：

```java
public boolean hasPermissionInManifest(Context context, String permissionName) {
    final String packageName = context.getPackageName();
    try {
        final PackageInfo packageInfo = context.getPackageManager()
                .getPackageInfo(packageName, PackageManager.GET_PERMISSIONS);
        final String[] declaredPermisisons = packageInfo.requestedPermissions;
        if (declaredPermisisons != null && declaredPermisisons.length > 0) {
            for (String p : declaredPermisisons) {
                if (p.equals(permissionName)) {
                    return true;
                }
            }
        }
    } catch (NameNotFoundException e) {

    }
    return false;
}
```

参考

- [Android M Camera Intent + permission bug? - Stack Overflow](https://stackoverflow.com/questions/32789027/android-m-camera-intent-permission-bug)
- [在运行时请求权限](https://developer.android.com/training/permissions/requesting.html)