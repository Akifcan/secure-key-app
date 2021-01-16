## Secure Key App

![thumb](https://i.hizliresim.com/AcjUby.png)

Geliştireceğimiz uygulama bir API Key yönetme uygulaması.  Bu  uygulamamızda kullanıcı ip adresini sisteme kayıt 
edecek daha sonra bizim verdiğimiz api servisine istek göndericek ve asıl kullanacağı API keyi 
almış olacak. Tabii bundan önce istek limiti, izin verilen api listesi, izin verilmeyen ip listesi ve istek atan ip adresini logluyoruz. 
İlk önce uygulamamızda kullanacağımız bootstrap temayı vue.js e uygun hale getiriyoruz. Daha sonra github oauth servisi ile uygulamamıza giriş yapıp giriş kontrollerini yapıyoruz ayrıca projemize Jsonwebtoken'i dahil ediyoruz  ve daha sonra otomatik olarak giriş yapıyoruz. 
Backendimizi rest api olarak hazırlıyoruz ve client ile yani vue.js ile uygulamamızı haberleştiriyoruz uygulamamız da state management olarak vuex kütüphanesi kullanıyoruz, 
her bir store için ayrı ayrı modüller oluşturuyoruz, kullanacağımız keylerin güvenliği için de .env dosyaları ile çalışıyoruz ve scriptlerimizi composition api ile yazıyoruz. 
Son olarak uygulamamıza bilboard.js grafik kütüphanesi ile atılan istekleri tarihe göre bar chart üzerinden gösteriyoruz. Grafik verileri için de mongoose orm ile gruplama yapıyoruz. 

Kullanacağımız teknolojiler: Vue.js, Node.js, MongoDB, Mongoose, Vuex, Bilboard.js, Jsonwebtoken, Express.js

Umarım bu projeyi beğenirsiniz ayrıca youtube kanalımdaki projelere de bakabilirsiniz. 
Eğer bu projenin kaynak kodlarına erişmek isterseniz kurs içerisinden github repository üzerinden sorabilirsiniz. 
Github repository üzerinden 17 adet branch'e ulaşacaksınız 1. branch uygulamamızın ilk hali yaptığımız kurulumlar ve 17. branch ise uygulamamızın final yani son hali.
