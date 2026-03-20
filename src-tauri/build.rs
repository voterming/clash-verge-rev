fn main() {
<<<<<<< HEAD
    #[cfg(feature = "clippy")]
    {
        println!("cargo:warning=Skipping tauri_build during Clippy");
    }

    #[cfg(not(feature = "clippy"))]
    tauri_build::build();
=======
    tauri_build::build()
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}
