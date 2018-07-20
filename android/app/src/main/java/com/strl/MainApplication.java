package com.strl;

import android.app.Application;
import net.zubricky.AndroidKeyboardAdjust.AndroidKeyboardAdjustPackage;
import com.facebook.react.ReactApplication;
import kim.taegon.rnintl.ReactNativeIntlPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.kajoo.reactnativecommon.textinput.*;
import com.BV.LinearGradient.LinearGradientPackage;
import co.il.nester.android.react.streetview.NSTStreetViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new AndroidKeyboardAdjustPackage(),
            new ReactNativeIntlPackage(),
            new RNSpinkitPackage(),
            new TextInputDelKeyHandlerPackage(),
            new NSTStreetViewPackage(),
            new VectorIconsPackage(),
            new RNGooglePlacesPackage(),
          new MapsPackage(),
          new LinearGradientPackage()

      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
