
// 26weeks.ai - Theme mapping for Flutter (Material 3)
// Place this file in lib/theme/26weeks_theme.dart and add design_tokens.json to assets.

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;

Color _hex(String hex) {
  final buffer = StringBuffer();
  if (hex.length == 6 || hex.length == 7) buffer.write('ff');
  buffer.write(hex.replaceFirst('#', ''));
  return Color(int.parse(buffer.toString(), radix: 16));
}

class Tokens {
  final Map<String, dynamic> raw;
  Tokens(this.raw);

  Color _c(String path) {
    final parts = path.split('.');
    dynamic current = raw;
    for (final p in parts) { current = current[p]; }
    return _hex(current as String);
  }

  // Quick getters
  Color get brandPrimary => _c('colors.semantic.light.brand.primary');
  Color get brandSecondary => _c('colors.semantic.light.brand.secondary');

  // Light scheme
  ColorScheme lightScheme() {
    return ColorScheme(
      brightness: Brightness.light,
      primary: _c('colors.semantic.light.brand.primary'),
      onPrimary: _hex('#0B0E10'),
      primaryContainer: _hex('#FFE5D6'),
      onPrimaryContainer: _hex('#0B0E10'),

      secondary: _c('colors.semantic.light.brand.secondary'),
      onSecondary: _hex('#FDF6E3'),
      secondaryContainer: _hex('#CDE0E2'),
      onSecondaryContainer: _hex('#075056'),

      error: _hex('#D64545'),
      onError: Colors.white,
      errorContainer: _hex('#F8D6D6'),
      onErrorContainer: _hex('#6B1C1C'),

      surface: _c('colors.semantic.light.surface'),
      onSurface: _c('colors.semantic.light.text.primary'),
      surfaceVariant: _hex('#E9EAEB'),
      onSurfaceVariant: _hex('#38444B'),

      outline: _hex('#D3DBDD'),
      outlineVariant: _hex('#A7ACAF'),

      background: _c('colors.semantic.light.background'),
      onBackground: _c('colors.semantic.light.text.primary'),

      tertiary: _hex('#F4D47C'),
      onTertiary: _hex('#233038'),

      shadow: Colors.black,
      scrim: Colors.black,
      inverseSurface: _hex('#233038'),
      onInverseSurface: _hex('#FDF6E3'),
      inversePrimary: _hex('#FF7B36'),
    );
  }

  // Dark scheme
  ColorScheme darkScheme() {
    return ColorScheme(
      brightness: Brightness.dark,
      primary: _c('colors.semantic.dark.brand.primary'),
      onPrimary: _hex('#0B0E10'),
      primaryContainer: _hex('#7B2E00'),
      onPrimaryContainer: _hex('#FDF6E3'),

      secondary: _c('colors.semantic.dark.brand.secondary'),
      onSecondary: _hex('#FDF6E3'),
      secondaryContainer: _hex('#063F44'),
      onSecondaryContainer: _hex('#E6EDEE'),

      error: _hex('#D64545'),
      onError: Colors.white,
      errorContainer: _hex('#7A2A2A'),
      onErrorContainer: _hex('#FCECEC'),

      surface: _c('colors.semantic.dark.surface'),
      onSurface: _c('colors.semantic.dark.text.primary'),
      surfaceVariant: _hex('#1C262C'),
      onSurfaceVariant: _hex('#D3DBDD'),

      outline: _hex('#3A4A58'),
      outlineVariant: _hex('#4E595F'),

      background: _c('colors.semantic.dark.background'),
      onBackground: _c('colors.semantic.dark.text.primary'),

      tertiary: _hex('#F4D47C'),
      onTertiary: _hex('#233038'),

      shadow: Colors.black,
      scrim: Colors.black,
      inverseSurface: _hex('#FDF6E3'),
      onInverseSurface: _hex('#233038'),
      inversePrimary: _hex('#FF7B36'),
    );
  }
}

class AppTheme {
  final Tokens tokens;
  AppTheme(this.tokens);

  static Future<AppTheme> load() async {
    final raw = await rootBundle.loadString('assets/tokens/design_tokens.json');
    final map = jsonDecode(raw) as Map<String, dynamic>;
    return AppTheme(Tokens(map));
  }

  ThemeData materialLight() {
    final scheme = tokens.lightScheme();
    return ThemeData(
      colorScheme: scheme,
      useMaterial3: true,
      scaffoldBackgroundColor: tokens.raw['colors']['semantic']['light']['background'] != null
          ? _hex(tokens.raw['colors']['semantic']['light']['background'])
          : scheme.background,
      appBarTheme: AppBarTheme(backgroundColor: scheme.surface, foregroundColor: scheme.onSurface),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: _hex('#FBF2D7'),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: _hex('#D3DBDD')),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: _hex('#BF4600'),
          foregroundColor: _hex('#0B0E10'),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      ),
    );
  }

  ThemeData materialDark() {
    final scheme = tokens.darkScheme();
    return ThemeData(
      colorScheme: scheme,
      useMaterial3: true,
      scaffoldBackgroundColor: tokens.raw['colors']['semantic']['dark']['background'] != null
          ? _hex(tokens.raw['colors']['semantic']['dark']['background'])
          : scheme.background,
      appBarTheme: AppBarTheme(backgroundColor: scheme.surface, foregroundColor: scheme.onSurface),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: _hex('#1C262C'),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: _hex('#4E595F')),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: _hex('#BF4600'),
          foregroundColor: _hex('#0B0E10'),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      ),
    );
  }
}
