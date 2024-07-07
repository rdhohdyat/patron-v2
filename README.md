## Tentang Project

Project ini dibangun menggunakan laravel 11 + inertia React js, untuk style dari component nya menggunakan shadcn sedangkan untuk ui menggunakan tailwind css.

## Menjalankan Project Pertama kali
1. pastikan sudah terinstall php 8.2 dan node js
2. setelah melakuakan clone ke repository, jalankan perintah berikut ini : 
- composer install -> untuk menginstall depedency laravel
- npm install -> untuk mengintall depedency react
- php artisan migrate -> untuk melakukan migrasi tabel
- php artisan serve dan npm run dev di berbeda terminal

## Aturan dalam commit
Gunakan beberapa aturan berikut saat ingin melakukan commit ke project, hal ini dilakukan untuk mempermudah proses tracing apabila terjadi kesalahan pada fitur tertentu nantinya.

- feat: (membuat fitur baru)
- fix: (melakukan perbaikan pada bug dan lain lain)
- docs: (mengganti isi dari dokumentasi)
- style: (pemformatan, titik koma hilang, dll)

contoh perintah commit : "git commit -m "feat(auth) : menambahkan fitur login dan register"
note : dalam melakukan commit pastikan fitur dan hal lainnya pada project sudah aman saat dijalankan

