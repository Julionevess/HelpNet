package com.jns.questoesgp.util;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.widget.Toast;

import static android.view.WindowManager.LayoutParams.TYPE_APPLICATION_PANEL;

public class AndroidUtil {

	public static void showMessageOK(Context context, String message) {
		showMessageOK(context, null, message, null);
	}

	public static void showMessageOK(Context context, String message, DialogInterface.OnClickListener okListener) {
		showMessageOK(context, null, message, okListener);
	}

	public static void showMessageOK(Context context, String title, String message, DialogInterface.OnClickListener okListener) {
		try {
			if (okListener == null) {
				okListener = new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialogInterface, int i) {
						dialogInterface.dismiss();
					}
				};
			}

			AlertDialog.Builder builder = new AlertDialog.Builder(context);
			builder.setCancelable(false);
			builder.setMessage(message);
			builder.setPositiveButton("Ok", okListener);
			if (title != null) {
				builder.setTitle(title);
			}

			AlertDialog dialog = builder.create();
			if (dialog != null) {
				dialog.setCanceledOnTouchOutside(false);
				dialog.getWindow().setType(TYPE_APPLICATION_PANEL);
				dialog.show();
			}

		} catch (Exception e) {
			if (context != null)
				Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
		}
	}
}
