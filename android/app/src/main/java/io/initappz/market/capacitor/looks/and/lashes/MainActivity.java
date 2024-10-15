package io.initappz.market.capacitor.looks.and.lashes;

import android.os.Bundle;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Limpiar la caché del WebView
    WebView webView = new WebView(this);
    webView.clearCache(true);
  }
}
