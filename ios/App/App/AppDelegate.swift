import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        return true
    }

    // MARK: - Deep Links (URL Schemes)
    // 先回傳 true 讓專案順利 build/run（之後真的需要 deep link 再接回 Capacitor）
    func application(_ app: UIApplication,
                     open url: URL,
                     options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return true
    }

    // MARK: - Universal Links / Handoff
    // 先回傳 true 讓專案順利 build/run（之後真的需要 universal links 再接回 Capacitor）
    func application(_ application: UIApplication,
                     continue userActivity: NSUserActivity,
                     restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        _ = restorationHandler
        return true
    }
}
