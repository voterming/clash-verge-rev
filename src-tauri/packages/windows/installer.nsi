<<<<<<< HEAD
Unicode true
ManifestDPIAware true
; Add in `dpiAwareness` `PerMonitorV2` to manifest for Windows 10 1607+ (note this should not affect lower versions since they should be able to ignore this and pick up `dpiAware` `true` set by `ManifestDPIAware true`)
; Currently undocumented on NSIS's website but is in the Docs folder of source tree, see
; https://github.com/kichik/nsis/blob/5fc0b87b819a9eec006df4967d08e522ddd651c9/Docs/src/attributes.but#L286-L300
; https://github.com/tauri-apps/tauri/pull/10106
ManifestDPIAwareness PerMonitorV2

!if "{{compression}}" == "none"
  SetCompress off
!else
  ; Set the compression algorithm. We default to LZMA.
=======
; This file is copied from https://github.com/tauri-apps/tauri/blob/tauri-v1.5/tooling/bundler/src/bundle/windows/templates/installer.nsi
; and edit to fit the needs of the project. the latest tauri 2.x has a different base nsi script.
RequestExecutionLevel admin

Unicode true
; Set the compression algorithm. Default is LZMA.
!if "{{compression}}" == ""
  SetCompressor /SOLID lzma
!else
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  SetCompressor /SOLID "{{compression}}"
!endif

!include MUI2.nsh
!include FileFunc.nsh
!include x64.nsh
!include WordFunc.nsh
<<<<<<< HEAD
!include "utils.nsh"
!include "FileAssociation.nsh"
=======
!include "StrFunc.nsh"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
!include "Win\COM.nsh"
!include "Win\Propkey.nsh"
!include "WinVer.nsh"
!include "LogicLib.nsh"
<<<<<<< HEAD
!include "StrFunc.nsh"
${StrCase}
${StrLoc}

!addplugindir "$%AppData%\Local\NSIS\"

{{#if installer_hooks}}
!include "{{installer_hooks}}"
{{/if}}

!define WEBVIEW2APPGUID "{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}"

=======
!addplugindir "$%AppData%\Local\NSIS\"
${StrCase}
${StrLoc}

>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
!define MANUFACTURER "{{manufacturer}}"
!define PRODUCTNAME "{{product_name}}"
!define VERSION "{{version}}"
!define VERSIONWITHBUILD "{{version_with_build}}"
!define SHORTDESCRIPTION "{{short_description}}"
<<<<<<< HEAD
!define HOMEPAGE "{{homepage}}"
=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
!define INSTALLMODE "{{install_mode}}"
!define LICENSE "{{license}}"
!define INSTALLERICON "{{installer_icon}}"
!define SIDEBARIMAGE "{{sidebar_image}}"
!define HEADERIMAGE "{{header_image}}"
!define MAINBINARYNAME "{{main_binary_name}}"
!define MAINBINARYSRCPATH "{{main_binary_path}}"
!define BUNDLEID "{{bundle_id}}"
!define COPYRIGHT "{{copyright}}"
!define OUTFILE "{{out_file}}"
!define ARCH "{{arch}}"
<<<<<<< HEAD
!define ADDITIONALPLUGINSPATH "{{additional_plugins_path}}"
=======
!define PLUGINSPATH "{{additional_plugins_path}}"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
!define ALLOWDOWNGRADES "{{allow_downgrades}}"
!define DISPLAYLANGUAGESELECTOR "{{display_language_selector}}"
!define INSTALLWEBVIEW2MODE "{{install_webview2_mode}}"
!define WEBVIEW2INSTALLERARGS "{{webview2_installer_args}}"
!define WEBVIEW2BOOTSTRAPPERPATH "{{webview2_bootstrapper_path}}"
!define WEBVIEW2INSTALLERPATH "{{webview2_installer_path}}"
<<<<<<< HEAD
!define MINIMUMWEBVIEW2VERSION "{{minimum_webview2_version}}"
!define UNINSTKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCTNAME}"
!define MANUKEY "Software\${MANUFACTURER}"
!define MANUPRODUCTKEY "${MANUKEY}\${PRODUCTNAME}"
!define UNINSTALLERSIGNCOMMAND "{{uninstaller_sign_cmd}}"
!define ESTIMATEDSIZE "{{estimated_size}}"
!define STARTMENUFOLDER "{{start_menu_folder}}"

Var PassiveMode
Var UpdateMode
Var NoShortcutMode
Var WixMode
Var OldMainBinaryName
Var VC_REDIST_URL
Var VC_REDIST_EXE
Var VC_RUNTIME_READY
Var VC_RUNTIME_NEEDED
=======
!define UNINSTKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCTNAME}"
!define MANUPRODUCTKEY "Software\${MANUFACTURER}\${PRODUCTNAME}"
!define UNINSTALLERSIGNCOMMAND "{{uninstaller_sign_cmd}}"
!define ESTIMATEDSIZE "{{estimated_size}}"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

Name "${PRODUCTNAME}"
BrandingText "${COPYRIGHT}"
OutFile "${OUTFILE}"

<<<<<<< HEAD
; We don't actually use this value as default install path,
; it's just for nsis to append the product name folder in the directory selector
; https://nsis.sourceforge.io/Reference/InstallDir
!define PLACEHOLDER_INSTALL_DIR "placeholder\${PRODUCTNAME}"
InstallDir "${PLACEHOLDER_INSTALL_DIR}"

=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
VIProductVersion "${VERSIONWITHBUILD}"
VIAddVersionKey "ProductName" "${PRODUCTNAME}"
VIAddVersionKey "FileDescription" "${SHORTDESCRIPTION}"
VIAddVersionKey "LegalCopyright" "${COPYRIGHT}"
VIAddVersionKey "FileVersion" "${VERSION}"
VIAddVersionKey "ProductVersion" "${VERSION}"

<<<<<<< HEAD
# additional plugins
!if "${ADDITIONALPLUGINSPATH}" != ""
  !addplugindir "${ADDITIONALPLUGINSPATH}"
!endif

; Uninstaller signing command
=======
; Plugins path, currently exists for linux only
!if "${PLUGINSPATH}" != ""
    !addplugindir "${PLUGINSPATH}"
!endif

>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
!if "${UNINSTALLERSIGNCOMMAND}" != ""
  !uninstfinalize '${UNINSTALLERSIGNCOMMAND}'
!endif

; Handle install mode, `perUser`, `perMachine` or `both`
!if "${INSTALLMODE}" == "perMachine"
<<<<<<< HEAD
  RequestExecutionLevel admin
=======
  RequestExecutionLevel highest
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
!endif

!if "${INSTALLMODE}" == "currentUser"
  RequestExecutionLevel user
!endif

!if "${INSTALLMODE}" == "both"
  !define MULTIUSER_MUI
  !define MULTIUSER_INSTALLMODE_INSTDIR "${PRODUCTNAME}"
  !define MULTIUSER_INSTALLMODE_COMMANDLINE
  !if "${ARCH}" == "x64"
    !define MULTIUSER_USE_PROGRAMFILES64
  !else if "${ARCH}" == "arm64"
    !define MULTIUSER_USE_PROGRAMFILES64
  !endif
  !define MULTIUSER_INSTALLMODE_DEFAULT_REGISTRY_KEY "${UNINSTKEY}"
  !define MULTIUSER_INSTALLMODE_DEFAULT_REGISTRY_VALUENAME "CurrentUser"
  !define MULTIUSER_INSTALLMODEPAGE_SHOWUSERNAME
  !define MULTIUSER_INSTALLMODE_FUNCTION RestorePreviousInstallLocation
  !define MULTIUSER_EXECUTIONLEVEL Highest
  !include MultiUser.nsh
!endif

<<<<<<< HEAD
; Installer icon
=======
; installer icon
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
!if "${INSTALLERICON}" != ""
  !define MUI_ICON "${INSTALLERICON}"
!endif

<<<<<<< HEAD
; Installer sidebar image
=======
; installer sidebar image
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
!if "${SIDEBARIMAGE}" != ""
  !define MUI_WELCOMEFINISHPAGE_BITMAP "${SIDEBARIMAGE}"
!endif

<<<<<<< HEAD
; Installer header image
=======
; installer header image
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
!if "${HEADERIMAGE}" != ""
  !define MUI_HEADERIMAGE
  !define MUI_HEADERIMAGE_BITMAP  "${HEADERIMAGE}"
!endif

; Define registry key to store installer language
!define MUI_LANGDLL_REGISTRY_ROOT "HKCU"
!define MUI_LANGDLL_REGISTRY_KEY "${MANUPRODUCTKEY}"
!define MUI_LANGDLL_REGISTRY_VALUENAME "Installer Language"

; Installer pages, must be ordered as they appear
; 1. Welcome Page
!define MUI_PAGE_CUSTOMFUNCTION_PRE SkipIfPassive
!insertmacro MUI_PAGE_WELCOME

; 2. License Page (if defined)
!if "${LICENSE}" != ""
  !define MUI_PAGE_CUSTOMFUNCTION_PRE SkipIfPassive
  !insertmacro MUI_PAGE_LICENSE "${LICENSE}"
!endif

; 3. Install mode (if it is set to `both`)
!if "${INSTALLMODE}" == "both"
  !define MUI_PAGE_CUSTOMFUNCTION_PRE SkipIfPassive
  !insertmacro MULTIUSER_PAGE_INSTALLMODE
!endif

<<<<<<< HEAD
; 4. Custom page to ask user if he wants to reinstall/uninstall
;    only if a previous installation was detected
=======

; 4. Custom page to ask user if he wants to reinstall/uninstall
;    only if a previous installtion was detected
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
Var ReinstallPageCheck
Page custom PageReinstall PageLeaveReinstall
Function PageReinstall
  ; Uninstall previous WiX installation if exists.
  ;
<<<<<<< HEAD
  ; A WiX installer stores the installation info in registry
=======
  ; A WiX installer stores the isntallation info in registry
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ; using a UUID and so we have to loop through all keys under
  ; `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall`
  ; and check if `DisplayName` and `Publisher` keys match ${PRODUCTNAME} and ${MANUFACTURER}
  ;
<<<<<<< HEAD
  ; This has a potential issue that there maybe another installation that matches
=======
  ; This has a potentional issue that there maybe another installation that matches
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ; our ${PRODUCTNAME} and ${MANUFACTURER} but wasn't installed by our WiX installer,
  ; however, this should be fine since the user will have to confirm the uninstallation
  ; and they can chose to abort it if doesn't make sense.
  StrCpy $0 0
  wix_loop:
    EnumRegKey $1 HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" $0
<<<<<<< HEAD
    StrCmp $1 "" wix_loop_done ; Exit loop if there is no more keys to loop on
=======
    StrCmp $1 "" wix_done ; Exit loop if there is no more keys to loop on
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    IntOp $0 $0 + 1
    ReadRegStr $R0 HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\$1" "DisplayName"
    ReadRegStr $R1 HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\$1" "Publisher"
    StrCmp "$R0$R1" "${PRODUCTNAME}${MANUFACTURER}" 0 wix_loop
    ReadRegStr $R0 HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\$1" "UninstallString"
    ${StrCase} $R1 $R0 "L"
    ${StrLoc} $R0 $R1 "msiexec" ">"
<<<<<<< HEAD
    StrCmp $R0 0 0 wix_loop_done
    StrCpy $WixMode 1
    StrCpy $R6 "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\$1"
    Goto compare_version
  wix_loop_done:
=======
    StrCmp $R0 0 0 wix_done
    StrCpy $R7 "wix"
    StrCpy $R6 "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\$1"
    Goto compare_version
  wix_done:
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  ; Check if there is an existing installation, if not, abort the reinstall page
  ReadRegStr $R0 SHCTX "${UNINSTKEY}" ""
  ReadRegStr $R1 SHCTX "${UNINSTKEY}" "UninstallString"
  ${IfThen} "$R0$R1" == "" ${|} Abort ${|}

  ; Compare this installar version with the existing installation
  ; and modify the messages presented to the user accordingly
  compare_version:
  StrCpy $R4 "$(older)"
<<<<<<< HEAD
  ${If} $WixMode = 1
=======
  ${If} $R7 == "wix"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    ReadRegStr $R0 HKLM "$R6" "DisplayVersion"
  ${Else}
    ReadRegStr $R0 SHCTX "${UNINSTKEY}" "DisplayVersion"
  ${EndIf}
  ${IfThen} $R0 == "" ${|} StrCpy $R4 "$(unknown)" ${|}

  nsis_tauri_utils::SemverCompare "${VERSION}" $R0
  Pop $R0
  ; Reinstalling the same version
<<<<<<< HEAD
  ${If} $R0 = 0
=======
  ${If} $R0 == 0
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    StrCpy $R1 "$(alreadyInstalledLong)"
    StrCpy $R2 "$(addOrReinstall)"
    StrCpy $R3 "$(uninstallApp)"
    !insertmacro MUI_HEADER_TEXT "$(alreadyInstalled)" "$(chooseMaintenanceOption)"
<<<<<<< HEAD
  ; Upgrading
  ${ElseIf} $R0 = 1
=======
    StrCpy $R5 "2"
  ; Upgrading
  ${ElseIf} $R0 == 1
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    StrCpy $R1 "$(olderOrUnknownVersionInstalled)"
    StrCpy $R2 "$(uninstallBeforeInstalling)"
    StrCpy $R3 "$(dontUninstall)"
    !insertmacro MUI_HEADER_TEXT "$(alreadyInstalled)" "$(choowHowToInstall)"
<<<<<<< HEAD
  ; Downgrading
  ${ElseIf} $R0 = -1
=======
    StrCpy $R5 "1"
  ; Downgrading
  ${ElseIf} $R0 == -1
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    StrCpy $R1 "$(newerVersionInstalled)"
    StrCpy $R2 "$(uninstallBeforeInstalling)"
    !if "${ALLOWDOWNGRADES}" == "true"
      StrCpy $R3 "$(dontUninstall)"
    !else
      StrCpy $R3 "$(dontUninstallDowngrade)"
    !endif
    !insertmacro MUI_HEADER_TEXT "$(alreadyInstalled)" "$(choowHowToInstall)"
<<<<<<< HEAD
=======
    StrCpy $R5 "1"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ${Else}
    Abort
  ${EndIf}

<<<<<<< HEAD
  ; Skip showing the page if passive
  ;
  ; Note that we don't call this earlier at the begining
  ; of this function because we need to populate some variables
  ; related to current installed version if detected and whether
  ; we are downgrading or not.
  ${If} $PassiveMode = 1
    Call PageLeaveReinstall
  ${Else}
    nsDialogs::Create 1018
    Pop $R4
    ${IfThen} $(^RTL) = 1 ${|} nsDialogs::SetRTL $(^RTL) ${|}

    ${NSD_CreateLabel} 0 0 100% 24u $R1
    Pop $R1

    ${NSD_CreateRadioButton} 30u 50u -30u 8u $R2
    Pop $R2
    ${NSD_OnClick} $R2 PageReinstallUpdateSelection

    ${NSD_CreateRadioButton} 30u 70u -30u 8u $R3
    Pop $R3
    ; Disable this radio button if downgrading and downgrades are disabled
    !if "${ALLOWDOWNGRADES}" == "false"
      ${IfThen} $R0 = -1 ${|} EnableWindow $R3 0 ${|}
    !endif
    ${NSD_OnClick} $R3 PageReinstallUpdateSelection

    ; Check the first radio button if this the first time
    ; we enter this page or if the second button wasn't
    ; selected the last time we were on this page
    ${If} $ReinstallPageCheck <> 2
      SendMessage $R2 ${BM_SETCHECK} ${BST_CHECKED} 0
    ${Else}
      SendMessage $R3 ${BM_SETCHECK} ${BST_CHECKED} 0
    ${EndIf}

    ${NSD_SetFocus} $R2
    nsDialogs::Show
  ${EndIf}
=======
  Call SkipIfPassive

  nsDialogs::Create 1018
  Pop $R4
  ${IfThen} $(^RTL) == 1 ${|} nsDialogs::SetRTL $(^RTL) ${|}

  ${NSD_CreateLabel} 0 0 100% 24u $R1
  Pop $R1

  ${NSD_CreateRadioButton} 30u 50u -30u 8u $R2
  Pop $R2
  ${NSD_OnClick} $R2 PageReinstallUpdateSelection

  ${NSD_CreateRadioButton} 30u 70u -30u 8u $R3
  Pop $R3
  ; disable this radio button if downgrading and downgrades are disabled
  !if "${ALLOWDOWNGRADES}" == "false"
    ${IfThen} $R0 == -1 ${|} EnableWindow $R3 0 ${|}
  !endif
  ${NSD_OnClick} $R3 PageReinstallUpdateSelection

  ; Check the first radio button if this the first time
  ; we enter this page or if the second button wasn't
  ; selected the last time we were on this page
  ${If} $ReinstallPageCheck != 2
    SendMessage $R2 ${BM_SETCHECK} ${BST_CHECKED} 0
  ${Else}
    SendMessage $R3 ${BM_SETCHECK} ${BST_CHECKED} 0
  ${EndIf}

  ${NSD_SetFocus} $R2
  nsDialogs::Show
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
FunctionEnd
Function PageReinstallUpdateSelection
  ${NSD_GetState} $R2 $R1
  ${If} $R1 == ${BST_CHECKED}
    StrCpy $ReinstallPageCheck 1
  ${Else}
    StrCpy $ReinstallPageCheck 2
  ${EndIf}
FunctionEnd
Function PageLeaveReinstall
  ${NSD_GetState} $R2 $R1

<<<<<<< HEAD
  ; If migrating from Wix, always uninstall
  ${If} $WixMode = 1
    Goto reinst_uninstall
  ${EndIf}

  ; In update mode, always proceeds without uninstalling
  ${If} $UpdateMode = 1
    Goto reinst_done
  ${EndIf}

  ; $R0 holds whether same(0)/upgrading(1)/downgrading(-1) version
  ; $R1 holds the radio buttons state:
  ;   1 => first choice was selected
  ;   0 => second choice was selected
  ${If} $R0 = 0 ; Same version, proceed
    ${If} $R1 = 1              ; User chose to add/reinstall
      Goto reinst_done
    ${Else}                    ; User chose to uninstall
      Goto reinst_uninstall
    ${EndIf}
  ${ElseIf} $R0 = 1 ; Upgrading
    ${If} $R1 = 1              ; User chose to uninstall
      Goto reinst_uninstall
    ${Else}
      Goto reinst_done         ; User chose NOT to uninstall
    ${EndIf}
  ${ElseIf} $R0 = -1 ; Downgrading
    ${If} $R1 = 1              ; User chose to uninstall
      Goto reinst_uninstall
    ${Else}
      Goto reinst_done         ; User chose NOT to uninstall
    ${EndIf}
  ${EndIf}
=======
  ; $R5 holds whether we are reinstalling the same version or not
  ; $R5 == "1" -> different versions
  ; $R5 == "2" -> same version
  ;
  ; $R1 holds the radio buttons state. its meaning is dependant on the context
  StrCmp $R5 "1" 0 +2 ; Existing install is not the same version?
    StrCmp $R1 "1" reinst_uninstall reinst_done ; $R1 == "1", then user chose to uninstall existing version, otherwise skip uninstalling
  StrCmp $R1 "1" reinst_done ; Same version? skip uninstalling
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  reinst_uninstall:
    HideWindow
    ClearErrors

<<<<<<< HEAD
    ${If} $WixMode = 1
=======
    ${If} $R7 == "wix"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
      ReadRegStr $R1 HKLM "$R6" "UninstallString"
      ExecWait '$R1' $0
    ${Else}
      ReadRegStr $4 SHCTX "${MANUPRODUCTKEY}" ""
      ReadRegStr $R1 SHCTX "${UNINSTKEY}" "UninstallString"
<<<<<<< HEAD
      ${IfThen} $UpdateMode = 1 ${|} StrCpy $R1 "$R1 /UPDATE" ${|} ; append /UPDATE
      ${IfThen} $PassiveMode = 1 ${|} StrCpy $R1 "$R1 /P" ${|} ; append /P
      StrCpy $R1 "$R1 _?=$4" ; append uninstall directory
      ExecWait '$R1' $0
=======
      ExecWait '$R1 /P _?=$4' $0
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    ${EndIf}

    BringToFront

    ${IfThen} ${Errors} ${|} StrCpy $0 2 ${|} ; ExecWait failed, set fake exit code

    ${If} $0 <> 0
    ${OrIf} ${FileExists} "$INSTDIR\${MAINBINARYNAME}.exe"
<<<<<<< HEAD
      ; User cancelled wix uninstaller? return to select un/reinstall page
      ${If} $WixMode = 1
      ${AndIf} $0 = 1602
        Abort
      ${EndIf}

      ; User cancelled NSIS uninstaller? return to select un/reinstall page
      ${If} $0 = 1
        Abort
      ${EndIf}

      ; Other erros? show generic error message and return to select un/reinstall page
      MessageBox MB_ICONEXCLAMATION "$(unableToUninstall)"
      Abort
=======
      ${If} $0 = 1 ; User aborted uninstaller?
        StrCmp $R5 "2" 0 +2 ; Is the existing install the same version?
          Quit ; ...yes, already installed, we are done
        Abort
      ${EndIf}
      MessageBox MB_ICONEXCLAMATION "$(unableToUninstall)"
      Abort
    ${Else}
      StrCpy $0 $R1 1
      ${IfThen} $0 == '"' ${|} StrCpy $R1 $R1 -1 1 ${|} ; Strip quotes from UninstallString
      Delete $R1
      RMDir $INSTDIR
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    ${EndIf}
  reinst_done:
FunctionEnd

<<<<<<< HEAD
; 5. Choose install directory page
=======
; 5. Choose install directoy page
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
!define MUI_PAGE_CUSTOMFUNCTION_PRE SkipIfPassive
!insertmacro MUI_PAGE_DIRECTORY

; 6. Start menu shortcut page
<<<<<<< HEAD
Var AppStartMenuFolder
!if "${STARTMENUFOLDER}" != ""
  !define MUI_PAGE_CUSTOMFUNCTION_PRE SkipIfPassive
  !define MUI_STARTMENUPAGE_DEFAULTFOLDER "${STARTMENUFOLDER}"
!else
  !define MUI_PAGE_CUSTOMFUNCTION_PRE Skip
!endif
=======
!define MUI_PAGE_CUSTOMFUNCTION_PRE SkipIfPassive
Var AppStartMenuFolder
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
!insertmacro MUI_PAGE_STARTMENU Application $AppStartMenuFolder

; 7. Installation page
!insertmacro MUI_PAGE_INSTFILES

; 8. Finish page
;
; Don't auto jump to finish page after installation page,
; because the installation page has useful info that can be used debug any issues with the installer.
!define MUI_FINISHPAGE_NOAUTOCLOSE
; Use show readme button in the finish page as a button create a desktop shortcut
!define MUI_FINISHPAGE_SHOWREADME
!define MUI_FINISHPAGE_SHOWREADME_TEXT "$(createDesktop)"
<<<<<<< HEAD
!define MUI_FINISHPAGE_SHOWREADME_FUNCTION CreateOrUpdateDesktopShortcut
=======
!define MUI_FINISHPAGE_SHOWREADME_FUNCTION CreateDesktopShortcut
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
; Show run app after installation.
!define MUI_FINISHPAGE_RUN
!define MUI_FINISHPAGE_RUN_FUNCTION RunMainBinary
!define MUI_PAGE_CUSTOMFUNCTION_PRE SkipIfPassive
!insertmacro MUI_PAGE_FINISH

Function RunMainBinary
  nsis_tauri_utils::RunAsUser "$INSTDIR\${MAINBINARYNAME}.exe" ""
FunctionEnd

; Uninstaller Pages
; 1. Confirm uninstall page
Var DeleteAppDataCheckbox
Var DeleteAppDataCheckboxState
!define /ifndef WS_EX_LAYOUTRTL         0x00400000
!define MUI_PAGE_CUSTOMFUNCTION_SHOW un.ConfirmShow
<<<<<<< HEAD
Function un.ConfirmShow ; Add add a `Delete app data` check box
  ; $1 inner dialog HWND
  ; $2 window DPI
  ; $3 style
  ; $4 x
  ; $5 y
  ; $6 width
  ; $7 height
  FindWindow $1 "#32770" "" $HWNDPARENT ; Find inner dialog
  System::Call "user32::GetDpiForWindow(p r1) i .r2"
  ${If} $(^RTL) = 1
    StrCpy $3 "${__NSD_CheckBox_EXSTYLE} | ${WS_EX_LAYOUTRTL}"
    IntOp $4 50 * $2
  ${Else}
    StrCpy $3 "${__NSD_CheckBox_EXSTYLE}"
    IntOp $4 0 * $2
  ${EndIf}
  IntOp $5 100 * $2
  IntOp $6 400 * $2
  IntOp $7 25 * $2
  IntOp $4 $4 / 96
  IntOp $5 $5 / 96
  IntOp $6 $6 / 96
  IntOp $7 $7 / 96
  System::Call 'user32::CreateWindowEx(i r3, w "${__NSD_CheckBox_CLASS}", w "$(deleteAppData)", i ${__NSD_CheckBox_STYLE}, i r4, i r5, i r6, i r7, p r1, i0, i0, i0) i .s'
  Pop $DeleteAppDataCheckbox
  SendMessage $HWNDPARENT ${WM_GETFONT} 0 0 $1
  SendMessage $DeleteAppDataCheckbox ${WM_SETFONT} $1 1
FunctionEnd
!define MUI_PAGE_CUSTOMFUNCTION_LEAVE un.ConfirmLeave
Function un.ConfirmLeave
  SendMessage $DeleteAppDataCheckbox ${BM_GETCHECK} 0 0 $DeleteAppDataCheckboxState
FunctionEnd
!define MUI_PAGE_CUSTOMFUNCTION_PRE un.SkipIfPassive
=======
Function un.ConfirmShow
    FindWindow $1 "#32770" "" $HWNDPARENT ; Find inner dialog
    ${If} $(^RTL) == 1
      System::Call 'USER32::CreateWindowEx(i${__NSD_CheckBox_EXSTYLE}|${WS_EX_LAYOUTRTL},t"${__NSD_CheckBox_CLASS}",t "$(deleteAppData)",i${__NSD_CheckBox_STYLE},i 50,i 100,i 400, i 25,i$1,i0,i0,i0)i.s'
    ${Else}
      System::Call 'USER32::CreateWindowEx(i${__NSD_CheckBox_EXSTYLE},t"${__NSD_CheckBox_CLASS}",t "$(deleteAppData)",i${__NSD_CheckBox_STYLE},i 0,i 100,i 400, i 25,i$1,i0,i0,i0)i.s'
    ${EndIf}
    Pop $DeleteAppDataCheckbox
    SendMessage $HWNDPARENT ${WM_GETFONT} 0 0 $1
    SendMessage $DeleteAppDataCheckbox ${WM_SETFONT} $1 1
FunctionEnd
!define MUI_PAGE_CUSTOMFUNCTION_LEAVE un.ConfirmLeave
Function un.ConfirmLeave
    SendMessage $DeleteAppDataCheckbox ${BM_GETCHECK} 0 0 $DeleteAppDataCheckboxState
FunctionEnd
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
!insertmacro MUI_UNPAGE_CONFIRM

; 2. Uninstalling Page
!insertmacro MUI_UNPAGE_INSTFILES

;Languages
{{#each languages}}
!insertmacro MUI_LANGUAGE "{{this}}"
{{/each}}
!insertmacro MUI_RESERVEFILE_LANGDLL
{{#each language_files}}
  !include "{{this}}"
{{/each}}

<<<<<<< HEAD
Function .onInit
  ${GetOptions} $CMDLINE "/P" $PassiveMode
  ${IfNot} ${Errors}
    StrCpy $PassiveMode 1
  ${EndIf}

  ${GetOptions} $CMDLINE "/NS" $NoShortcutMode
  ${IfNot} ${Errors}
    StrCpy $NoShortcutMode 1
  ${EndIf}

  ${GetOptions} $CMDLINE "/UPDATE" $UpdateMode
  ${IfNot} ${Errors}
    StrCpy $UpdateMode 1
  ${EndIf}
=======
!macro SetContext
  !if "${INSTALLMODE}" == "currentUser"
    SetShellVarContext current
  !else if "${INSTALLMODE}" == "perMachine"
    SetShellVarContext all
  !endif

  ${If} ${RunningX64}
    !if "${ARCH}" == "x64"
      SetRegView 64
    !else if "${ARCH}" == "arm64"
      SetRegView 64
    !else
      SetRegView 32
    !endif
  ${EndIf}
!macroend

Var PassiveMode
Function .onInit
  ${GetOptions} $CMDLINE "/P" $PassiveMode
  IfErrors +2 0
    StrCpy $PassiveMode 1
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  !if "${DISPLAYLANGUAGESELECTOR}" == "true"
    !insertmacro MUI_LANGDLL_DISPLAY
  !endif

  !insertmacro SetContext

<<<<<<< HEAD
  ${If} $INSTDIR == "${PLACEHOLDER_INSTALL_DIR}"
=======
  ${If} $INSTDIR == ""
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    ; Set default install location
    !if "${INSTALLMODE}" == "perMachine"
      ${If} ${RunningX64}
        !if "${ARCH}" == "x64"
          StrCpy $INSTDIR "$PROGRAMFILES64\${PRODUCTNAME}"
        !else if "${ARCH}" == "arm64"
          StrCpy $INSTDIR "$PROGRAMFILES64\${PRODUCTNAME}"
        !else
          StrCpy $INSTDIR "$PROGRAMFILES\${PRODUCTNAME}"
        !endif
      ${Else}
        StrCpy $INSTDIR "$PROGRAMFILES\${PRODUCTNAME}"
      ${EndIf}
    !else if "${INSTALLMODE}" == "currentUser"
      StrCpy $INSTDIR "$LOCALAPPDATA\${PRODUCTNAME}"
    !endif

    Call RestorePreviousInstallLocation
  ${EndIf}


  !if "${INSTALLMODE}" == "both"
    !insertmacro MULTIUSER_INIT
  !endif
FunctionEnd

<<<<<<< HEAD

Function CheckVCRuntime64
  Push $R0
  Push $R1
  StrCpy $VC_RUNTIME_READY "0"
  StrCpy $R1 "$WINDIR\Sysnative"
  IfFileExists "$R1\kernel32.dll" 0 +3
  IfFileExists "$R1\vcruntime140.dll" 0 missing
  IfFileExists "$R1\msvcp140.dll" 0 missing
  Goto found
  StrCpy $R1 "$WINDIR\System32"
  IfFileExists "$R1\vcruntime140.dll" 0 missing
  IfFileExists "$R1\msvcp140.dll" 0 missing
  found:
    StrCpy $VC_RUNTIME_READY "1"
    Goto done
  missing:
    StrCpy $VC_RUNTIME_READY "0"
  done:
    Pop $R1
    Pop $R0
FunctionEnd


=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
!macro CheckAllVergeProcesses
  ; Check if clash-verge-service.exe is running
  !if "${INSTALLMODE}" == "currentUser"
    nsis_tauri_utils::FindProcessCurrentUser "clash-verge-service.exe"
  !else
    nsis_tauri_utils::FindProcess "clash-verge-service.exe"
  !endif
  Pop $R0
  ${If} $R0 = 0
    DetailPrint "Kill clash-verge-service.exe..."
    !if "${INSTALLMODE}" == "currentUser"
      nsis_tauri_utils::KillProcessCurrentUser "clash-verge-service.exe"
    !else
      nsis_tauri_utils::KillProcess "clash-verge-service.exe"
    !endif
  ${EndIf}

  ; Check if verge-mihomo-alpha.exe is running
  !if "${INSTALLMODE}" == "currentUser"
    nsis_tauri_utils::FindProcessCurrentUser "verge-mihomo-alpha.exe"
  !else
    nsis_tauri_utils::FindProcess "verge-mihomo-alpha.exe"
  !endif
  Pop $R0
  ${If} $R0 = 0
    DetailPrint "Kill verge-mihomo-alpha.exe..."
    !if "${INSTALLMODE}" == "currentUser"
      nsis_tauri_utils::KillProcessCurrentUser "verge-mihomo-alpha.exe"
    !else
      nsis_tauri_utils::KillProcess "verge-mihomo-alpha.exe"
    !endif
  ${EndIf}

  ; Check if verge-mihomo.exe is running
  !if "${INSTALLMODE}" == "currentUser"
    nsis_tauri_utils::FindProcessCurrentUser "verge-mihomo.exe"
  !else
    nsis_tauri_utils::FindProcess "verge-mihomo.exe"
  !endif
  Pop $R0
  ${If} $R0 = 0
    DetailPrint "Kill verge-mihomo.exe..."
    !if "${INSTALLMODE}" == "currentUser"
      nsis_tauri_utils::KillProcessCurrentUser "verge-mihomo.exe"
    !else
      nsis_tauri_utils::KillProcess "verge-mihomo.exe"
    !endif
  ${EndIf}

  ; Check if clash-meta-alpha.exe is running
  !if "${INSTALLMODE}" == "currentUser"
    nsis_tauri_utils::FindProcessCurrentUser "clash-meta-alpha.exe"
  !else
    nsis_tauri_utils::FindProcess "clash-meta-alpha.exe"
  !endif
  Pop $R0
  ${If} $R0 = 0
    DetailPrint "Kill clash-meta-alpha.exe..."
    !if "${INSTALLMODE}" == "currentUser"
      nsis_tauri_utils::KillProcessCurrentUser "clash-meta-alpha.exe"
    !else
      nsis_tauri_utils::KillProcess "clash-meta-alpha.exe"
    !endif
  ${EndIf}

  ; Check if clash-meta.exe is running
  !if "${INSTALLMODE}" == "currentUser"
    nsis_tauri_utils::FindProcessCurrentUser "clash-meta.exe"
  !else
    nsis_tauri_utils::FindProcess "clash-meta.exe"
  !endif
  Pop $R0
  ${If} $R0 = 0
    DetailPrint "Kill clash-meta.exe..."
    !if "${INSTALLMODE}" == "currentUser"
      nsis_tauri_utils::KillProcessCurrentUser "clash-meta.exe"
    !else
      nsis_tauri_utils::KillProcess "clash-meta.exe"
    !endif
  ${EndIf}
!macroend

!macro StartVergeService
  ; Check if the service exists
  SimpleSC::ExistsService "clash_verge_service"
<<<<<<< HEAD
  Pop $0  ; 0: service exists; other: service not exists
=======
  Pop $0  ; 0：service exists；other: service not exists
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ; Service exists
  ${If} $0 == 0
    Push $0
    ; Check if the service is running
    SimpleSC::ServiceIsRunning "clash_verge_service"
    Pop $0 ; returns an errorcode (<>0) otherwise success (0)
    Pop $1 ; returns 1 (service is running) - returns 0 (service is not running)
    ${If} $0 == 0
      Push $0
      ${If} $1 == 0
<<<<<<< HEAD
        DetailPrint "Restart ${PRODUCTNAME} Service..."
        SimpleSC::StartService "clash_verge_service" "" 30
      ${EndIf}
    ${ElseIf} $0 != 0
      Push $0
      SimpleSC::GetErrorMessage
      Pop $0
      MessageBox MB_OK|MB_ICONSTOP "Check Service Status Error ($0)"
=======
            DetailPrint "Restart Clash Verge Service..."
            SimpleSC::StartService "clash_verge_service" "" 30
      ${EndIf}
    ${ElseIf} $0 != 0
          Push $0
          SimpleSC::GetErrorMessage
          Pop $0
          MessageBox MB_OK|MB_ICONSTOP "Check Service Status Error ($0)"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    ${EndIf}
  ${EndIf}
!macroend

!macro RemoveVergeService
  ; Check if the service exists
  SimpleSC::ExistsService "clash_verge_service"
<<<<<<< HEAD
  Pop $0  ; 0: service exists; other: service not exists
=======
  Pop $0  ; 0：service exists；other: service not exists
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ; Service exists
  ${If} $0 == 0
    Push $0
    ; Check if the service is running
    SimpleSC::ServiceIsRunning "clash_verge_service"
    Pop $0 ; returns an errorcode (<>0) otherwise success (0)
    Pop $1 ; returns 1 (service is running) - returns 0 (service is not running)
    ${If} $0 == 0
      Push $0
      ${If} $1 == 1
<<<<<<< HEAD
        DetailPrint "Stop ${PRODUCTNAME} Service..."
        SimpleSC::StopService "clash_verge_service" 1 30
        Pop $0 ; returns an errorcode (<>0) otherwise success (0)
        ${If} $0 == 0
          DetailPrint "Removing ${PRODUCTNAME} Service..."
          SimpleSC::RemoveService "clash_verge_service"
        ${ElseIf} $0 != 0
          Push $0
          SimpleSC::GetErrorMessage
          Pop $0
          MessageBox MB_OK|MB_ICONSTOP "${PRODUCTNAME} Service Stop Error ($0)"
        ${EndIf}
      ${ElseIf} $1 == 0
        DetailPrint "Removing ${PRODUCTNAME} Service..."
        SimpleSC::RemoveService "clash_verge_service"
      ${EndIf}
    ${ElseIf} $0 != 0
      Push $0
      SimpleSC::GetErrorMessage
      Pop $0
      MessageBox MB_OK|MB_ICONSTOP "Check Service Status Error ($0)"
=======
        DetailPrint "Stop Clash Verge Service..."
        SimpleSC::StopService "clash_verge_service" 1 30
        Pop $0 ; returns an errorcode (<>0) otherwise success (0)
        ${If} $0 == 0
              DetailPrint "Removing Clash Verge Service..."
              SimpleSC::RemoveService "clash_verge_service"
        ${ElseIf} $0 != 0
                  Push $0
                  SimpleSC::GetErrorMessage
                  Pop $0
                  MessageBox MB_OK|MB_ICONSTOP "Clash Verge Service Stop Error ($0)"
        ${EndIf}
  ${ElseIf} $1 == 0
        DetailPrint "Removing Clash Verge Service..."
        SimpleSC::RemoveService "clash_verge_service"
  ${EndIf}
    ${ElseIf} $0 != 0
          Push $0
          SimpleSC::GetErrorMessage
          Pop $0
          MessageBox MB_OK|MB_ICONSTOP "Check Service Status Error ($0)"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    ${EndIf}
  ${EndIf}
!macroend

Section EarlyChecks
  ; Abort silent installer if downgrades is disabled
  !if "${ALLOWDOWNGRADES}" == "false"
<<<<<<< HEAD
  ${If} ${Silent}
    ; If downgrading
    ${If} $R0 = -1
      System::Call 'kernel32::AttachConsole(i -1)i.r0'
      ${If} $0 <> 0
=======
  IfSilent 0 silent_downgrades_done
    ; If downgrading
    ${If} $R0 == -1
      System::Call 'kernel32::AttachConsole(i -1)i.r0'
      ${If} $0 != 0
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        System::Call 'kernel32::GetStdHandle(i -11)i.r0'
        System::call 'kernel32::SetConsoleTextAttribute(i r0, i 0x0004)' ; set red color
        FileWrite $0 "$(silentDowngrades)"
      ${EndIf}
      Abort
    ${EndIf}
<<<<<<< HEAD
  ${EndIf}
=======
  silent_downgrades_done:
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  !endif

SectionEnd

<<<<<<< HEAD
Section CheckAndInstallVSRuntime
  StrCpy $VC_RUNTIME_NEEDED "0"

  ${If} ${IsNativeARM64}
    StrCpy $VC_REDIST_URL "https://aka.ms/vs/17/release/vc_redist.arm64.exe"
    StrCpy $VC_REDIST_EXE "vc_redist.arm64.exe"
    Call CheckVCRuntime64
    ${If} $VC_RUNTIME_READY != "1"
      StrCpy $VC_RUNTIME_NEEDED "1"
    ${EndIf}

  ${ElseIf} ${RunningX64}
    StrCpy $VC_REDIST_URL "https://aka.ms/vs/17/release/vc_redist.x64.exe"
    StrCpy $VC_REDIST_EXE "vc_redist.x64.exe"
    Call CheckVCRuntime64
    ${If} $VC_RUNTIME_READY != "1"
      StrCpy $VC_RUNTIME_NEEDED "1"
    ${EndIf}

  ${Else}
    StrCpy $VC_REDIST_URL "https://aka.ms/vs/17/release/vc_redist.x86.exe"
    StrCpy $VC_REDIST_EXE "vc_redist.x86.exe"

    IfFileExists "$SYSDIR\vcruntime140.dll" 0 filesMissing32
    IfFileExists "$SYSDIR\msvcp140.dll" 0 filesMissing32
    Goto afterFileCheck32
  filesMissing32:
    StrCpy $VC_RUNTIME_NEEDED "1"
  afterFileCheck32:
  ${EndIf}

  ${If} $VC_RUNTIME_NEEDED != "1"
    ${If} ${IsNativeARM64}
      SetRegView 64
      ClearErrors
      ReadRegDword $R0 HKLM "SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\arm64" "Installed"
      ${If} ${Errors}
        StrCpy $R0 0
      ${EndIf}
      SetRegView 32
    ${ElseIf} ${RunningX64}
      SetRegView 64
      ClearErrors
      ReadRegDword $R0 HKLM "SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\${ARCH}" "Installed"
      ${If} ${Errors}
        StrCpy $R0 0
      ${EndIf}
      SetRegView 32
    ${Else}
      ClearErrors
      ReadRegDword $R0 HKLM "SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x86" "Installed"
      ${If} ${Errors}
        StrCpy $R0 0
      ${EndIf}
    ${EndIf}

    ${If} $R0 != "1"
      StrCpy $VC_RUNTIME_NEEDED "1"
    ${EndIf}
  ${EndIf}

  ${If} $VC_RUNTIME_NEEDED != "1"
    DetailPrint "已检测到匹配的 Visual C++ Redistributable，跳过安装"
    Goto done_vc
  ${EndIf}

  DetailPrint "正在下载 Visual C++ Redistributable..."
  nsisdl::download "$VC_REDIST_URL" "$TEMP\$VC_REDIST_EXE"
  Pop $0
  ${If} $0 == "success"
    DetailPrint "正在安装 Visual C++ Redistributable..."
    ExecWait '"$TEMP\$VC_REDIST_EXE" /quiet /norestart' $0
    ${If} $0 == 0
      DetailPrint "Visual C++ Redistributable 安装成功"
    ${Else}
      DetailPrint "Visual C++ Redistributable 安装失败"
    ${EndIf}
    Delete "$TEMP\$VC_REDIST_EXE"
  ${Else}
    DetailPrint "Visual C++ Redistributable 下载失败"
  ${EndIf}

  done_vc:
SectionEnd

Section WebView2
  ; Check if Webview2 is already installed and skip this section
  ${If} ${RunningX64}
    ReadRegStr $4 HKLM "SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\${WEBVIEW2APPGUID}" "pv"
  ${Else}
    ReadRegStr $4 HKLM "SOFTWARE\Microsoft\EdgeUpdate\Clients\${WEBVIEW2APPGUID}" "pv"
  ${EndIf}
  ${If} $4 == ""
    ReadRegStr $4 HKCU "SOFTWARE\Microsoft\EdgeUpdate\Clients\${WEBVIEW2APPGUID}" "pv"
  ${EndIf}

  ${If} $4 == ""
    ; Webview2 installation
    ;
    ; Skip if updating
    ${If} $UpdateMode <> 1
      !if "${INSTALLWEBVIEW2MODE}" == "downloadBootstrapper"
        Delete "$TEMP\MicrosoftEdgeWebview2Setup.exe"
        DetailPrint "$(webview2Downloading)"
        NSISdl::download "https://go.microsoft.com/fwlink/p/?LinkId=2124703" "$TEMP\MicrosoftEdgeWebview2Setup.exe"
        Pop $0
        ${If} $0 == "success"
          DetailPrint "$(webview2DownloadSuccess)"
        ${Else}
          DetailPrint "$(webview2DownloadError)"
          Abort "$(webview2AbortError)"
        ${EndIf}
        StrCpy $6 "$TEMP\MicrosoftEdgeWebview2Setup.exe"
        Goto install_webview2
      !endif

      !if "${INSTALLWEBVIEW2MODE}" == "embedBootstrapper"
        Delete "$TEMP\MicrosoftEdgeWebview2Setup.exe"
        File "/oname=$TEMP\MicrosoftEdgeWebview2Setup.exe" "${WEBVIEW2BOOTSTRAPPERPATH}"
        DetailPrint "$(installingWebview2)"
        StrCpy $6 "$TEMP\MicrosoftEdgeWebview2Setup.exe"
        Goto install_webview2
      !endif

      !if "${INSTALLWEBVIEW2MODE}" == "offlineInstaller"
        Delete "$TEMP\MicrosoftEdgeWebView2RuntimeInstaller.exe"
        File "/oname=$TEMP\MicrosoftEdgeWebView2RuntimeInstaller.exe" "${WEBVIEW2INSTALLERPATH}"
        DetailPrint "$(installingWebview2)"
        StrCpy $6 "$TEMP\MicrosoftEdgeWebView2RuntimeInstaller.exe"
        Goto install_webview2
      !endif

      Goto webview2_done

      install_webview2:
        DetailPrint "$(installingWebview2)"
        ; $6 holds the path to the webview2 installer
        ExecWait "$6 ${WEBVIEW2INSTALLERARGS} /install" $1
        ${If} $1 = 0
          DetailPrint "$(webview2InstallSuccess)"
        ${Else}
          DetailPrint "$(webview2InstallError)"
          Abort "$(webview2AbortError)"
        ${EndIf}
      webview2_done:
    ${EndIf}
  ${Else}
    !if "${MINIMUMWEBVIEW2VERSION}" != ""
      ${VersionCompare} "${MINIMUMWEBVIEW2VERSION}" "$4" $R0
      ${If} $R0 = 1
        update_webview:
          DetailPrint "$(installingWebview2)"
          ${If} ${RunningX64}
            ReadRegStr $R1 HKLM "SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate" "path"
          ${Else}
            ReadRegStr $R1 HKLM "SOFTWARE\Microsoft\EdgeUpdate" "path"
          ${EndIf}
          ${If} $R1 == ""
            ReadRegStr $R1 HKCU "SOFTWARE\Microsoft\EdgeUpdate" "path"
          ${EndIf}
          ${If} $R1 != ""
            ; Chromium updater docs: https://source.chromium.org/chromium/chromium/src/+/main:docs/updater/user_manual.md
            ; Modified from "HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\Microsoft EdgeWebView\ModifyPath"
            ExecWait `"$R1" /install appguid=${WEBVIEW2APPGUID}&needsadmin=true` $1
            ${If} $1 = 0
              DetailPrint "$(webview2InstallSuccess)"
            ${Else}
              MessageBox MB_ICONEXCLAMATION|MB_ABORTRETRYIGNORE "$(webview2InstallError)" IDIGNORE ignore IDRETRY update_webview
              Quit
              ignore:
            ${EndIf}
          ${EndIf}
      ${EndIf}
    !endif
  ${EndIf}
SectionEnd

Section Install
  SetOutPath $INSTDIR

  !ifmacrodef NSIS_HOOK_PREINSTALL
    !insertmacro NSIS_HOOK_PREINSTALL
  !endif

  nsExec::Exec 'netsh int tcp res'

  !insertmacro CheckIfAppIsRunning "${MAINBINARYNAME}.exe" "${PRODUCTNAME}"
  !insertmacro CheckAllVergeProcesses

  ; Ensure startup folders exist
  CreateDirectory "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup"
  DetailPrint "Ensured system startup folder exists"

  SetShellVarContext current
  StrCpy $0 "$SMPROGRAMS\Startup"
  CreateDirectory "$0"
  DetailPrint "Ensured user startup folder exists: $0"

  ; Remove stale window-state files
  DetailPrint "Removing window-state.json / .window-state.json"
  Delete "$APPDATA\io.github.clash-verge-rev.clash-verge-rev\window-state.json"
  Delete "$APPDATA\io.github.clash-verge-rev.clash-verge-rev\.window-state.json"

  ; Clean legacy auto-launch registry entries
  StrCpy $R1 "Software\Microsoft\Windows\CurrentVersion\Run"

  SetRegView 64
=======
Section WebView2
  ; Check if Webview2 is already installed and skip this section
  ${If} ${RunningX64}
    ReadRegStr $4 HKLM "SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}" "pv"
  ${Else}
    ReadRegStr $4 HKLM "SOFTWARE\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}" "pv"
  ${EndIf}
  ReadRegStr $5 HKCU "SOFTWARE\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}" "pv"

  StrCmp $4 "" 0 webview2_done
  StrCmp $5 "" 0 webview2_done

  ; Webview2 install modes
  !if "${INSTALLWEBVIEW2MODE}" == "downloadBootstrapper"
    Delete "$TEMP\MicrosoftEdgeWebview2Setup.exe"
    DetailPrint "$(webview2Downloading)"
    NSISdl::download "https://go.microsoft.com/fwlink/p/?LinkId=2124703" "$TEMP\MicrosoftEdgeWebview2Setup.exe"
    Pop $0
    ${If} $0 == 0
      DetailPrint "$(webview2DownloadSuccess)"
    ${Else}
      DetailPrint "$(webview2DownloadError)"
      Abort "$(webview2AbortError)"
    ${EndIf}
    StrCpy $6 "$TEMP\MicrosoftEdgeWebview2Setup.exe"
    Goto install_webview2
  !endif

  !if "${INSTALLWEBVIEW2MODE}" == "embedBootstrapper"
    Delete "$TEMP\MicrosoftEdgeWebview2Setup.exe"
    File "/oname=$TEMP\MicrosoftEdgeWebview2Setup.exe" "${WEBVIEW2BOOTSTRAPPERPATH}"
    DetailPrint "$(installingWebview2)"
    StrCpy $6 "$TEMP\MicrosoftEdgeWebview2Setup.exe"
    Goto install_webview2
  !endif

  !if "${INSTALLWEBVIEW2MODE}" == "offlineInstaller"
    Delete "$TEMP\MicrosoftEdgeWebView2RuntimeInstaller.exe"
    File "/oname=$TEMP\MicrosoftEdgeWebView2RuntimeInstaller.exe" "${WEBVIEW2INSTALLERPATH}"
    DetailPrint "$(installingWebview2)"
    StrCpy $6 "$TEMP\MicrosoftEdgeWebView2RuntimeInstaller.exe"
    Goto install_webview2
  !endif

  Goto webview2_done

  install_webview2:
    DetailPrint "$(installingWebview2)"
    ; $6 holds the path to the webview2 installer
    ExecWait "$6 ${WEBVIEW2INSTALLERARGS} /install" $1
    ${If} $1 == 0
      DetailPrint "$(webview2InstallSuccess)"
    ${Else}
      DetailPrint "$(webview2InstallError)"
      Abort "$(webview2AbortError)"
    ${EndIf}
  webview2_done:
SectionEnd

!macro CheckIfAppIsRunning
  !if "${INSTALLMODE}" == "currentUser"
    nsis_tauri_utils::FindProcessCurrentUser "${MAINBINARYNAME}.exe"
  !else
    nsis_tauri_utils::FindProcess "${MAINBINARYNAME}.exe"
  !endif
  Pop $R0
  ${If} $R0 = 0
      IfSilent kill 0
      ${IfThen} $PassiveMode != 1 ${|} MessageBox MB_OKCANCEL "$(appRunningOkKill)" IDOK kill IDCANCEL cancel ${|}
      kill:
        !if "${INSTALLMODE}" == "currentUser"
          nsis_tauri_utils::KillProcessCurrentUser "${MAINBINARYNAME}.exe"
        !else
          nsis_tauri_utils::KillProcess "${MAINBINARYNAME}.exe"
        !endif
        Pop $R0
        Sleep 500
        ${If} $R0 = 0
          Goto app_check_done
        ${Else}
          IfSilent silent ui
          silent:
            System::Call 'kernel32::AttachConsole(i -1)i.r0'
            ${If} $0 != 0
              System::Call 'kernel32::GetStdHandle(i -11)i.r0'
              System::call 'kernel32::SetConsoleTextAttribute(i r0, i 0x0004)' ; set red color
              FileWrite $0 "$(appRunning)$\n"
            ${EndIf}
            Abort
          ui:
            Abort "$(failedToKillApp)"
        ${EndIf}
      cancel:
        Abort "$(appRunning)"
  ${EndIf}
  app_check_done:
!macroend



Var VC_REDIST_URL
Var VC_REDIST_EXE

Section CheckAndInstallVSRuntime
    ; 检查是否已安装 Visual C++ Redistributable
    ${If} ${IsNativeARM64}
        StrCpy $VC_REDIST_URL "https://aka.ms/vs/17/release/vc_redist.arm64.exe"
        StrCpy $VC_REDIST_EXE "vc_redist.arm64.exe"
        
        ; 检查关键DLL
        IfFileExists "$SYSDIR\vcruntime140.dll" 0 checkInstall
        IfFileExists "$SYSDIR\msvcp140.dll" Done checkInstall
        
    ${ElseIf} ${RunningX64}
        StrCpy $VC_REDIST_URL "https://aka.ms/vs/17/release/vc_redist.x64.exe"
        StrCpy $VC_REDIST_EXE "vc_redist.x64.exe"
        
        ; 检查关键DLL
        IfFileExists "$SYSDIR\vcruntime140.dll" 0 checkInstall
        IfFileExists "$SYSDIR\msvcp140.dll" Done checkInstall
        
    ${Else}
        StrCpy $VC_REDIST_URL "https://aka.ms/vs/17/release/vc_redist.x86.exe"
        StrCpy $VC_REDIST_EXE "vc_redist.x86.exe"
        
        ; 检查关键DLL
        IfFileExists "$SYSDIR\vcruntime140.dll" 0 checkInstall  
        IfFileExists "$SYSDIR\msvcp140.dll" Done checkInstall
    ${EndIf}

    checkInstall:
    ; 检查注册表
    ${If} ${RunningX64}
        SetRegView 64
        ReadRegDword $R0 HKLM "SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\${ARCH}" "Installed"
        ${If} $R0 == "1"
            Goto Done
        ${EndIf}
    ${Else}
        ReadRegDword $R0 HKLM "SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x86" "Installed"
        ${If} $R0 == "1"
            Goto Done
        ${EndIf}
    ${EndIf}

    ; 如果没有安装,则下载并安装
    DetailPrint "正在下载 Visual C++ Redistributable..."
    nsisdl::download "$VC_REDIST_URL" "$TEMP\$VC_REDIST_EXE"
    Pop $0
    ${If} $0 == "success"
        DetailPrint "正在安装 Visual C++ Redistributable..."
        ExecWait '"$TEMP\$VC_REDIST_EXE" /quiet /norestart' $0
        ${If} $0 == 0
            DetailPrint "Visual C++ Redistributable 安装成功"
        ${Else}
            DetailPrint "Visual C++ Redistributable 安装失败"
        ${EndIf}
        Delete "$TEMP\$VC_REDIST_EXE"
    ${Else}
        DetailPrint "Visual C++ Redistributable 下载失败"
    ${EndIf}
    
    Done:
SectionEnd



Section Install
  SetOutPath $INSTDIR
  nsExec::Exec 'netsh int tcp res'
  !insertmacro CheckIfAppIsRunning
  !insertmacro CheckAllVergeProcesses

  ; 清理自启动注册表项
  DetailPrint "Cleaning auto-launch registry entries..."

  StrCpy $R1 "Software\Microsoft\Windows\CurrentVersion\Run"
  
  SetRegView 64  
  ; 清理旧版本的注册表项 (Clash Verge)
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ReadRegStr $R2 HKCU "$R1" "Clash Verge"
  ${If} $R2 != ""
    DeleteRegValue HKCU "$R1" "Clash Verge"
  ${EndIf}
<<<<<<< HEAD
=======
  
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ReadRegStr $R2 HKLM "$R1" "Clash Verge"
  ${If} $R2 != ""
    DeleteRegValue HKLM "$R1" "Clash Verge"
  ${EndIf}
<<<<<<< HEAD
=======

  ; 清理新版本的注册表项 (clash-verge)
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ReadRegStr $R2 HKCU "$R1" "clash-verge"
  ${If} $R2 != ""
    DeleteRegValue HKCU "$R1" "clash-verge"
  ${EndIf}
<<<<<<< HEAD
=======
  
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ReadRegStr $R2 HKLM "$R1" "clash-verge"
  ${If} $R2 != ""
    DeleteRegValue HKLM "$R1" "clash-verge"
  ${EndIf}

<<<<<<< HEAD
  ; Remove legacy executables
  IfFileExists "$INSTDIR\Clash Verge.exe" 0 +2
    Delete "$INSTDIR\Clash Verge.exe"

  !insertmacro SetContext

=======
  ; Delete old files before installation
    ; Delete clash-verge.desktop
  IfFileExists "$INSTDIR\Clash Verge.exe" 0 +2
    Delete "$INSTDIR\Clash Verge.exe"
  
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ; Copy main executable
  File "${MAINBINARYSRCPATH}"

  ; Copy resources
  {{#each resources_dirs}}
    CreateDirectory "$INSTDIR\\{{this}}"
  {{/each}}
  {{#each resources}}
<<<<<<< HEAD
    File /a "/oname={{this.[1]}}" "{{no-escape @key}}"
=======
    File /a "/oname={{this.[1]}}" "{{@key}}"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  {{/each}}

  ; Copy external binaries
  {{#each binaries}}
<<<<<<< HEAD
    File /a "/oname={{this}}" "{{no-escape @key}}"
=======
    File /a "/oname={{this}}" "{{@key}}"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  {{/each}}

  !insertmacro StartVergeService

<<<<<<< HEAD
  ; Create file associations
  {{#each file_associations as |association| ~}}
    {{#each association.ext as |ext| ~}}
       !insertmacro APP_ASSOCIATE "{{ext}}" "{{or association.name ext}}" "{{association-description association.description ext}}" "$INSTDIR\${MAINBINARYNAME}.exe,0" "Open with ${PRODUCTNAME}" "$INSTDIR\${MAINBINARYNAME}.exe $\"%1$\""
    {{/each}}
  {{/each}}

  ; Register deep links
  {{#each deep_link_protocols as |protocol| ~}}
    WriteRegStr SHCTX "Software\Classes\\{{protocol}}" "URL Protocol" ""
    WriteRegStr SHCTX "Software\Classes\\{{protocol}}" "" "URL:${BUNDLEID} protocol"
    WriteRegStr SHCTX "Software\Classes\\{{protocol}}\DefaultIcon" "" "$\"$INSTDIR\${MAINBINARYNAME}.exe$\",0"
    WriteRegStr SHCTX "Software\Classes\\{{protocol}}\shell\open\command" "" "$\"$INSTDIR\${MAINBINARYNAME}.exe$\" $\"%1$\""
  {{/each}}

=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ; Create uninstaller
  WriteUninstaller "$INSTDIR\uninstall.exe"

  ; Save $INSTDIR in registry for future installations
  WriteRegStr SHCTX "${MANUPRODUCTKEY}" "" $INSTDIR

  !if "${INSTALLMODE}" == "both"
    ; Save install mode to be selected by default for the next installation such as updating
    ; or when uninstalling
    WriteRegStr SHCTX "${UNINSTKEY}" $MultiUser.InstallMode 1
  !endif

<<<<<<< HEAD
  ; Remove old main binary if it doesn't match new main binary name
  ReadRegStr $OldMainBinaryName SHCTX "${UNINSTKEY}" "MainBinaryName"
  ${If} $OldMainBinaryName != ""
  ${AndIf} $OldMainBinaryName != "${MAINBINARYNAME}.exe"
    Delete "$INSTDIR\$OldMainBinaryName"
  ${EndIf}

  ; Save current MAINBINARYNAME for future updates
  WriteRegStr SHCTX "${UNINSTKEY}" "MainBinaryName" "${MAINBINARYNAME}.exe"

=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ; Registry information for add/remove programs
  WriteRegStr SHCTX "${UNINSTKEY}" "DisplayName" "${PRODUCTNAME}"
  WriteRegStr SHCTX "${UNINSTKEY}" "DisplayIcon" "$\"$INSTDIR\${MAINBINARYNAME}.exe$\""
  WriteRegStr SHCTX "${UNINSTKEY}" "DisplayVersion" "${VERSION}"
  WriteRegStr SHCTX "${UNINSTKEY}" "Publisher" "${MANUFACTURER}"
  WriteRegStr SHCTX "${UNINSTKEY}" "InstallLocation" "$\"$INSTDIR$\""
  WriteRegStr SHCTX "${UNINSTKEY}" "UninstallString" "$\"$INSTDIR\uninstall.exe$\""
  WriteRegDWORD SHCTX "${UNINSTKEY}" "NoModify" "1"
  WriteRegDWORD SHCTX "${UNINSTKEY}" "NoRepair" "1"
<<<<<<< HEAD

  ${GetSize} "$INSTDIR" "/M=uninstall.exe /S=0K /G=0" $0 $1 $2
  IntOp $0 $0 + ${ESTIMATEDSIZE}
  IntFmt $0 "0x%08X" $0
  WriteRegDWORD SHCTX "${UNINSTKEY}" "EstimatedSize" "$0"

  !if "${HOMEPAGE}" != ""
    WriteRegStr SHCTX "${UNINSTKEY}" "URLInfoAbout" "${HOMEPAGE}"
    WriteRegStr SHCTX "${UNINSTKEY}" "URLUpdateInfo" "${HOMEPAGE}"
    WriteRegStr SHCTX "${UNINSTKEY}" "HelpLink" "${HOMEPAGE}"
  !endif

  ; Create start menu shortcut
  !insertmacro MUI_STARTMENU_WRITE_BEGIN Application
    Call CreateOrUpdateStartMenuShortcut
  !insertmacro MUI_STARTMENU_WRITE_END

  ; Create desktop shortcut for silent and passive installers
  ; because finish page will be skipped
  ${If} $PassiveMode = 1
  ${OrIf} ${Silent}
    Call CreateOrUpdateDesktopShortcut
  ${EndIf}

  !ifmacrodef NSIS_HOOK_POSTINSTALL
    !insertmacro NSIS_HOOK_POSTINSTALL
  !endif

  ; Auto close this page for passive mode
  ${If} $PassiveMode = 1
    SetAutoClose true
  ${EndIf}
=======
  WriteRegDWORD SHCTX "${UNINSTKEY}" "EstimatedSize" "${ESTIMATEDSIZE}"

  ; Create start menu shortcut (GUI)
  !insertmacro MUI_STARTMENU_WRITE_BEGIN Application
    Call CreateStartMenuShortcut
  !insertmacro MUI_STARTMENU_WRITE_END

  ; Create shortcuts for silent and passive installers, which
  ; can be disabled by passing `/NS` flag
  ; GUI installer has buttons for users to control creating them
  IfSilent check_ns_flag 0
  ${IfThen} $PassiveMode == 1 ${|} Goto check_ns_flag ${|}
  Goto shortcuts_done
  check_ns_flag:
    ${GetOptions} $CMDLINE "/NS" $R0
    IfErrors 0 shortcuts_done
      Call CreateDesktopShortcut
      Call CreateStartMenuShortcut
  shortcuts_done:

  ; Auto close this page for passive mode
  ${IfThen} $PassiveMode == 1 ${|} SetAutoClose true ${|}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
SectionEnd

Function .onInstSuccess
  ; Check for `/R` flag only in silent and passive installers because
  ; GUI installer has a toggle for the user to (re)start the app
<<<<<<< HEAD
  ${If} $PassiveMode = 1
  ${OrIf} ${Silent}
    ${GetOptions} $CMDLINE "/R" $R0
    ${IfNot} ${Errors}
      ${GetOptions} $CMDLINE "/ARGS" $R0
      nsis_tauri_utils::RunAsUser "$INSTDIR\${MAINBINARYNAME}.exe" "$R0"
    ${EndIf}
  ${EndIf}
=======
  IfSilent check_r_flag 0
  ${IfThen} $PassiveMode == 1 ${|} Goto check_r_flag ${|}
  Goto run_done
  check_r_flag:
    ${GetOptions} $CMDLINE "/R" $R0
    IfErrors run_done 0
      ${GetOptions} $CMDLINE "/ARGS" $R0
      nsis_tauri_utils::RunAsUser "$INSTDIR\${MAINBINARYNAME}.exe" "$R0"
  run_done:
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
FunctionEnd

Function un.onInit
  !insertmacro SetContext

  !if "${INSTALLMODE}" == "both"
    !insertmacro MULTIUSER_UNINIT
  !endif

  !insertmacro MUI_UNGETLANGUAGE
<<<<<<< HEAD

  ${GetOptions} $CMDLINE "/P" $PassiveMode
  ${IfNot} ${Errors}
    StrCpy $PassiveMode 1
  ${EndIf}

  ${GetOptions} $CMDLINE "/UPDATE" $UpdateMode
  ${IfNot} ${Errors}
    StrCpy $UpdateMode 1
  ${EndIf}
FunctionEnd

Section Uninstall

  !ifmacrodef NSIS_HOOK_PREUNINSTALL
    !insertmacro NSIS_HOOK_PREUNINSTALL
  !endif

  !insertmacro CheckIfAppIsRunning "${MAINBINARYNAME}.exe" "${PRODUCTNAME}"
  !insertmacro CheckAllVergeProcesses
  !insertmacro RemoveVergeService

  ; Remove cached window state files
  DetailPrint "Removing window-state.json / .window-state.json"
  SetShellVarContext current
  Delete "$APPDATA\io.github.clash-verge-rev.clash-verge-rev\window-state.json"
  Delete "$APPDATA\io.github.clash-verge-rev.clash-verge-rev\.window-state.json"

  ; Clean legacy auto-launch registry entries
  StrCpy $R1 "Software\Microsoft\Windows\CurrentVersion\Run"

  SetRegView 64
=======
FunctionEnd

!macro DeleteAppUserModelId
  !insertmacro ComHlpr_CreateInProcInstance ${CLSID_DestinationList} ${IID_ICustomDestinationList} r1 ""
  ${If} $1 P<> 0
    ${ICustomDestinationList::DeleteList} $1 '("${BUNDLEID}")'
    ${IUnknown::Release} $1 ""
  ${EndIf}
  !insertmacro ComHlpr_CreateInProcInstance ${CLSID_ApplicationDestinations} ${IID_IApplicationDestinations} r1 ""
  ${If} $1 P<> 0
    ${IApplicationDestinations::SetAppID} $1 '("${BUNDLEID}")i.r0'
    ${If} $0 >= 0
      ${IApplicationDestinations::RemoveAllDestinations} $1 ''
    ${EndIf}
    ${IUnknown::Release} $1 ""
  ${EndIf}
!macroend

; From https://stackoverflow.com/a/42816728/16993372
!macro UnpinShortcut shortcut
  !insertmacro ComHlpr_CreateInProcInstance ${CLSID_StartMenuPin} ${IID_IStartMenuPinnedList} r0 ""
  ${If} $0 P<> 0
      System::Call 'SHELL32::SHCreateItemFromParsingName(ws, p0, g "${IID_IShellItem}", *p0r1)' "${shortcut}"
      ${If} $1 P<> 0
          ${IStartMenuPinnedList::RemoveFromList} $0 '(r1)'
          ${IUnknown::Release} $1 ""
      ${EndIf}
      ${IUnknown::Release} $0 ""
  ${EndIf}
!macroend

Section Uninstall
  !insertmacro CheckIfAppIsRunning
  !insertmacro CheckAllVergeProcesses
  !insertmacro RemoveVergeService

  ; 清理自启动注册表项
  DetailPrint "Cleaning auto-launch registry entries..."
  
  StrCpy $R1 "Software\Microsoft\Windows\CurrentVersion\Run"
  
  SetRegView 64
  ; 清理旧版本的注册表项 (Clash Verge)
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ReadRegStr $R2 HKCU "$R1" "Clash Verge"
  ${If} $R2 != ""
    DeleteRegValue HKCU "$R1" "Clash Verge"
  ${EndIf}
<<<<<<< HEAD
=======
  
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ReadRegStr $R2 HKLM "$R1" "Clash Verge"
  ${If} $R2 != ""
    DeleteRegValue HKLM "$R1" "Clash Verge"
  ${EndIf}
<<<<<<< HEAD
=======

  ; 清理新版本的注册表项 (clash-verge)
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ReadRegStr $R2 HKCU "$R1" "clash-verge"
  ${If} $R2 != ""
    DeleteRegValue HKCU "$R1" "clash-verge"
  ${EndIf}
<<<<<<< HEAD
=======
  
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ReadRegStr $R2 HKLM "$R1" "clash-verge"
  ${If} $R2 != ""
    DeleteRegValue HKLM "$R1" "clash-verge"
  ${EndIf}

<<<<<<< HEAD
  ; Remove legacy executables
  IfFileExists "$INSTDIR\Clash Verge.exe" 0 +2
    Delete "$INSTDIR\Clash Verge.exe"

  !insertmacro SetContext

=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ; Delete the app directory and its content from disk
  ; Copy main executable
  Delete "$INSTDIR\${MAINBINARYNAME}.exe"

  ; Delete resources
  {{#each resources}}
    Delete "$INSTDIR\\{{this.[1]}}"
  {{/each}}
<<<<<<< HEAD

=======
  Delete "$INSTDIR\resources"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  ; Delete external binaries
  {{#each binaries}}
    Delete "$INSTDIR\\{{this}}"
  {{/each}}

<<<<<<< HEAD
  ; Delete app associations
  {{#each file_associations as |association| ~}}
    {{#each association.ext as |ext| ~}}
      !insertmacro APP_UNASSOCIATE "{{ext}}" "{{or association.name ext}}"
    {{/each}}
  {{/each}}

  ; Delete deep links
  {{#each deep_link_protocols as |protocol| ~}}
    ReadRegStr $R7 SHCTX "Software\Classes\\{{protocol}}\shell\open\command" ""
    ${If} $R7 == "$\"$INSTDIR\${MAINBINARYNAME}.exe$\" $\"%1$\""
      DeleteRegKey SHCTX "Software\Classes\\{{protocol}}"
    ${EndIf}
  {{/each}}

=======
  ; Delete clash-verge.desktop
  IfFileExists "$INSTDIR\Clash Verge.exe" 0 +2
    Delete "$INSTDIR\Clash Verge.exe"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  ; Delete uninstaller
  Delete "$INSTDIR\uninstall.exe"

  {{#each resources_ancestors}}
  RMDir /REBOOTOK "$INSTDIR\\{{this}}"
  {{/each}}
  RMDir "$INSTDIR"

<<<<<<< HEAD
  ; Remove shortcuts if not updating
  ${If} $UpdateMode <> 1
    !insertmacro DeleteAppUserModelId

    ; Remove start menu shortcut
    !insertmacro MUI_STARTMENU_GETFOLDER Application $AppStartMenuFolder
    !insertmacro IsShortcutTarget "$SMPROGRAMS\$AppStartMenuFolder\${PRODUCTNAME}.lnk" "$INSTDIR\${MAINBINARYNAME}.exe"
    Pop $0
    ${If} $0 = 1
      !insertmacro UnpinShortcut "$SMPROGRAMS\$AppStartMenuFolder\${PRODUCTNAME}.lnk"
      Delete "$SMPROGRAMS\$AppStartMenuFolder\${PRODUCTNAME}.lnk"
      RMDir "$SMPROGRAMS\$AppStartMenuFolder"
    ${EndIf}
    !insertmacro IsShortcutTarget "$SMPROGRAMS\${PRODUCTNAME}.lnk" "$INSTDIR\${MAINBINARYNAME}.exe"
    Pop $0
    ${If} $0 = 1
      !insertmacro UnpinShortcut "$SMPROGRAMS\${PRODUCTNAME}.lnk"
      Delete "$SMPROGRAMS\${PRODUCTNAME}.lnk"
    ${EndIf}

    ; Remove desktop shortcuts
    !insertmacro IsShortcutTarget "$DESKTOP\${PRODUCTNAME}.lnk" "$INSTDIR\${MAINBINARYNAME}.exe"
    Pop $0
    ${If} $0 = 1
      !insertmacro UnpinShortcut "$DESKTOP\${PRODUCTNAME}.lnk"
      Delete "$DESKTOP\${PRODUCTNAME}.lnk"
    ${EndIf}

    ; Remove legacy public desktop shortcuts
    Delete "C:\Users\Public\Desktop\Clash Verge.lnk"
    Delete "C:\Users\Public\Desktop\clash-verge.lnk"

    ; Remove legacy shortcuts from all user desktops
    DetailPrint "Removing ${PRODUCTNAME} shortcuts from all user desktops..."
    SetRegView 64
    StrCpy $R1 0
    LegacyUserLoop:
      EnumRegKey $R2 HKLM "SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList" $R1
      ${If} $R2 == ""
        Goto LegacyUserDone
      ${EndIf}
      ReadRegStr $R3 HKLM "SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList\$R2" "ProfileImagePath"
      ${If} $R3 != ""
        StrCpy $R4 "$R3\Desktop"
        Delete "$R4\Clash Verge.lnk"
        Delete "$R4\clash-verge.lnk"
      ${EndIf}
      IntOp $R1 $R1 + 1
      Goto LegacyUserLoop
    LegacyUserDone:
    !insertmacro SetContext

    ; Remove legacy start menu folders
    SetShellVarContext current
    RMDir /r /REBOOTOK "$SMPROGRAMS\Clash Verge"
    RMDir /r /REBOOTOK "$SMPROGRAMS\clash-verge"
    !insertmacro SetContext
    RMDir /r /REBOOTOK "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Clash Verge"
    RMDir /r /REBOOTOK "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\clash-verge"

    ; Clean legacy registry keys
    SetRegView 64
    DeleteRegKey HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\Clash Verge.exe"
    DeleteRegKey HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\clash-verge.exe"
    DeleteRegKey HKLM "Software\Clash Verge Rev"
    DeleteRegKey HKLM "Software\Clash Verge"
    DeleteRegKey HKCU "Software\Clash Verge Rev"
    DeleteRegKey HKCU "Software\Clash Verge"
    DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\ClashVerge"
    DeleteRegKey HKCU "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\Clash Verge"

    StrCpy $R1 0
    LegacyUninstallLoop:
      EnumRegKey $R2 HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" $R1
      ${If} $R2 == ""
        Goto LegacyUninstallDone
      ${EndIf}
      ReadRegStr $R3 HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\$R2" "DisplayName"
      ${If} $R3 != ""
        StrCmp $R3 "Clash Verge" 0 +3
        StrCmp $R3 "clash-verge" 0 +2
        DeleteRegKey HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\$R2"
      ${EndIf}
      IntOp $R1 $R1 + 1
      Goto LegacyUninstallLoop
    LegacyUninstallDone:
    !insertmacro SetContext
  ${EndIf}
=======
  !insertmacro DeleteAppUserModelId
  !insertmacro UnpinShortcut "$SMPROGRAMS\$AppStartMenuFolder\${MAINBINARYNAME}.lnk"
  !insertmacro UnpinShortcut "$DESKTOP\${MAINBINARYNAME}.lnk"

  ; Remove start menu shortcut
  !insertmacro MUI_STARTMENU_GETFOLDER Application $AppStartMenuFolder
  Delete "$SMPROGRAMS\$AppStartMenuFolder\${MAINBINARYNAME}.lnk"
  RMDir "$SMPROGRAMS\$AppStartMenuFolder"

  ; Remove desktop shortcuts
  Delete "$DESKTOP\${MAINBINARYNAME}.lnk"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  ; Remove registry information for add/remove programs
  !if "${INSTALLMODE}" == "both"
    DeleteRegKey SHCTX "${UNINSTKEY}"
  !else if "${INSTALLMODE}" == "perMachine"
    DeleteRegKey HKLM "${UNINSTKEY}"
  !else
    DeleteRegKey HKCU "${UNINSTKEY}"
  !endif

<<<<<<< HEAD
  ; Removes the Autostart entry for ${PRODUCTNAME} from the HKCU Run key if it exists.
  ; This ensures the program does not launch automatically after uninstallation if it exists.
  ; If it doesn't exist, it does nothing.
  ; We do this when not updating (to preserve the registry value on updates)
  ${If} $UpdateMode <> 1
    DeleteRegValue HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "${PRODUCTNAME}"
  ${EndIf}

  ; Delete app data if the checkbox is selected
  ; and if not updating
  ${If} $DeleteAppDataCheckboxState = 1
  ${AndIf} $UpdateMode <> 1
    ; Clear the install location $INSTDIR from registry
    DeleteRegKey SHCTX "${MANUPRODUCTKEY}"
    DeleteRegKey /ifempty SHCTX "${MANUKEY}"

    ; Clear the install language from registry
    DeleteRegValue HKCU "${MANUPRODUCTKEY}" "Installer Language"
    DeleteRegKey /ifempty HKCU "${MANUPRODUCTKEY}"
    DeleteRegKey /ifempty HKCU "${MANUKEY}"

=======
  DeleteRegValue HKCU "${MANUPRODUCTKEY}" "Installer Language"

  ; Delete app data
  ${If} $DeleteAppDataCheckboxState == 1
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    SetShellVarContext current
    RmDir /r "$APPDATA\${BUNDLEID}"
    RmDir /r "$LOCALAPPDATA\${BUNDLEID}"
  ${EndIf}

<<<<<<< HEAD
  !ifmacrodef NSIS_HOOK_POSTUNINSTALL
    !insertmacro NSIS_HOOK_POSTUNINSTALL
  !endif

  ; Auto close if passive mode or updating
  ${If} $PassiveMode = 1
  ${OrIf} $UpdateMode = 1
    SetAutoClose true
  ${EndIf}
=======
  ${GetOptions} $CMDLINE "/P" $R0
  IfErrors +2 0
    SetAutoClose true
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
SectionEnd

Function RestorePreviousInstallLocation
  ReadRegStr $4 SHCTX "${MANUPRODUCTKEY}" ""
  StrCmp $4 "" +2 0
    StrCpy $INSTDIR $4
FunctionEnd

<<<<<<< HEAD
Function Skip
  Abort
FunctionEnd

Function SkipIfPassive
  ${IfThen} $PassiveMode = 1  ${|} Abort ${|}
FunctionEnd
Function un.SkipIfPassive
  ${IfThen} $PassiveMode = 1  ${|} Abort ${|}
FunctionEnd

Function CreateOrUpdateStartMenuShortcut
  ; We used to use product name as MAINBINARYNAME
  ; migrate old shortcuts to target the new MAINBINARYNAME
  StrCpy $R0 0

  !insertmacro IsShortcutTarget "$SMPROGRAMS\$AppStartMenuFolder\${PRODUCTNAME}.lnk" "$INSTDIR\$OldMainBinaryName"
  Pop $0
  ${If} $0 = 1
    !insertmacro SetShortcutTarget "$SMPROGRAMS\$AppStartMenuFolder\${PRODUCTNAME}.lnk" "$INSTDIR\${MAINBINARYNAME}.exe"
    StrCpy $R0 1
  ${EndIf}

  !insertmacro IsShortcutTarget "$SMPROGRAMS\${PRODUCTNAME}.lnk" "$INSTDIR\$OldMainBinaryName"
  Pop $0
  ${If} $0 = 1
    !insertmacro SetShortcutTarget "$SMPROGRAMS\${PRODUCTNAME}.lnk" "$INSTDIR\${MAINBINARYNAME}.exe"
    StrCpy $R0 1
  ${EndIf}

  ${If} $R0 = 1
    Return
  ${EndIf}

  ; Skip creating shortcut if in update mode or no shortcut mode
  ; but always create if migrating from wix
  ${If} $WixMode = 0
    ${If} $UpdateMode = 1
    ${OrIf} $NoShortcutMode = 1
      Return
    ${EndIf}
  ${EndIf}

  !if "${STARTMENUFOLDER}" != ""
    CreateDirectory "$SMPROGRAMS\$AppStartMenuFolder"
    CreateShortcut "$SMPROGRAMS\$AppStartMenuFolder\${PRODUCTNAME}.lnk" "$INSTDIR\${MAINBINARYNAME}.exe"
    !insertmacro SetLnkAppUserModelId "$SMPROGRAMS\$AppStartMenuFolder\${PRODUCTNAME}.lnk"
  !else
    CreateShortcut "$SMPROGRAMS\${PRODUCTNAME}.lnk" "$INSTDIR\${MAINBINARYNAME}.exe"
    !insertmacro SetLnkAppUserModelId "$SMPROGRAMS\${PRODUCTNAME}.lnk"
  !endif
FunctionEnd

Function CreateOrUpdateDesktopShortcut
  ; We used to use product name as MAINBINARYNAME
  ; migrate old shortcuts to target the new MAINBINARYNAME
  !insertmacro IsShortcutTarget "$DESKTOP\${PRODUCTNAME}.lnk" "$INSTDIR\$OldMainBinaryName"
  Pop $0
  ${If} $0 = 1
    !insertmacro SetShortcutTarget "$DESKTOP\${PRODUCTNAME}.lnk" "$INSTDIR\${MAINBINARYNAME}.exe"
    Return
  ${EndIf}

  ; Skip creating shortcut if in update mode or no shortcut mode
  ; but always create if migrating from wix
  ${If} $WixMode = 0
    ${If} $UpdateMode = 1
    ${OrIf} $NoShortcutMode = 1
      Return
    ${EndIf}
  ${EndIf}

  CreateShortcut "$DESKTOP\${PRODUCTNAME}.lnk" "$INSTDIR\${MAINBINARYNAME}.exe"
  !insertmacro SetLnkAppUserModelId "$DESKTOP\${PRODUCTNAME}.lnk"
=======
Function SkipIfPassive
  ${IfThen} $PassiveMode == 1  ${|} Abort ${|}
FunctionEnd

!macro SetLnkAppUserModelId shortcut
  !insertmacro ComHlpr_CreateInProcInstance ${CLSID_ShellLink} ${IID_IShellLink} r0 ""
  ${If} $0 P<> 0
    ${IUnknown::QueryInterface} $0 '("${IID_IPersistFile}",.r1)'
    ${If} $1 P<> 0
      ${IPersistFile::Load} $1 '("${shortcut}", ${STGM_READWRITE})'
      ${IUnknown::QueryInterface} $0 '("${IID_IPropertyStore}",.r2)'
      ${If} $2 P<> 0
        System::Call 'Oleaut32::SysAllocString(w "${BUNDLEID}") i.r3'
        System::Call '*${SYSSTRUCT_PROPERTYKEY}(${PKEY_AppUserModel_ID})p.r4'
        System::Call '*${SYSSTRUCT_PROPVARIANT}(${VT_BSTR},,&i4 $3)p.r5'
        ${IPropertyStore::SetValue} $2 '($4,$5)'

        System::Call 'Oleaut32::SysFreeString($3)'
        System::Free $4
        System::Free $5
        ${IPropertyStore::Commit} $2 ""
        ${IUnknown::Release} $2 ""
        ${IPersistFile::Save} $1 '("${shortcut}",1)'
      ${EndIf}
      ${IUnknown::Release} $1 ""
    ${EndIf}
    ${IUnknown::Release} $0 ""
  ${EndIf}
!macroend

Function CreateDesktopShortcut
  CreateShortcut "$DESKTOP\${MAINBINARYNAME}.lnk" "$INSTDIR\${MAINBINARYNAME}.exe"
  !insertmacro SetLnkAppUserModelId "$DESKTOP\${MAINBINARYNAME}.lnk"
FunctionEnd

Function CreateStartMenuShortcut
  CreateDirectory "$SMPROGRAMS\$AppStartMenuFolder"
  CreateShortcut "$SMPROGRAMS\$AppStartMenuFolder\${MAINBINARYNAME}.lnk" "$INSTDIR\${MAINBINARYNAME}.exe"
  !insertmacro SetLnkAppUserModelId "$SMPROGRAMS\$AppStartMenuFolder\${MAINBINARYNAME}.lnk"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
FunctionEnd
