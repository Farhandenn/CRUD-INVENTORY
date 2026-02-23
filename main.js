import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDf84tuPbEIrQ4b2jcU0MeXjg4OY3kE-yU",
  authDomain: "insancemerlang-7c3fb.firebaseapp.com",
  projectId: "insancemerlang-7c3fb",
  storageBucket: "insancemerlang-7c3fb.firebasestorage.app",
  messagingSenderId: "775357332019",
  appId: "1:775357332019:web:25b794ac39eceb84f00146",
  measurementId: "G-2T6Q5VM932"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const inventoryCollection = collection(db, "inventory");



// TAMPILKAN DAFTAR inventory
export async function daftarinventory() {
  const snapshot = await getDocs(inventoryCollection);
  const tabel = document.getElementById("tabelData");
  tabel.innerHTML = "";

  snapshot.forEach((d) => {
    const data = d.data();
    const id = d.id;

    const baris = document.createElement("tr");

    const kolomno = document.createElement("td");
    kolomno.textContent = data.no;

    const kolomnamabarang = document.createElement("td");
    kolomnamabarang.textContent = data.namabarang;

    const kolomharga = document.createElement("td");
    kolomharga.textContent = data.harga;
    
    const kolomstok = document.createElement("td");
    kolomstok.textContent = data.harga;

    const kolomAksi = document.createElement("td");

    // tombol edit
    const tombolEdit = document.createElement("a");
    tombolEdit.textContent = "Edit";
    tombolEdit.href = "edit.html?id=" + id;
    tombolEdit.className = "button edit";

    // tombol hapus
    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.onclick = () => hapusinventory(id);

    kolomAksi.appendChild(tombolEdit);
    kolomAksi.appendChild(document.createTextNode(" "));
    kolomAksi.appendChild(tombolHapus);

    baris.appendChild(kolomno);
    baris.appendChild(kolomnamabaramg);
    baris.appendChild(kolomharga);
    baris.appendChild(stok)
    baris.appendChild(kolomAksi);

    tabel.appendChild(baris);
  });
}


// TAMBAH inventory

export async function tambahinventory() {
  const no= document.getElementById("no").value;
  const namabarang = document.getElementById("namabarang").value;
  const harga = document.getElementById("harga").value;
  const stok = document.getElementById("stok").value
  await addDoc(inventoryCollection, {
    no: no,
    namabarang: namabarang,
    harga: harga, 
    stok:stok, 
  });

  window.location.href = "daftar.html";
}



// HAPUS inventory

export async function hapusinventory(id) {
  if (!confirm("Yakin ingin menghapus data ini?")) return;

  await deleteDoc(doc(db, "inventory", id));
  await daftarinventory();
}


// AMBIL DATA inventory
export async function ambildatainventory(id) {
  const ref = doc(db, "inventory", id);
  const snap = await getDoc(ref);
  return snap.data();
}


// UBAH DATA inventory

export async function ubahdatainventory(id) {
  const judul = document.getElementById("judul").value;
  const artis = document.getElementById("artis").value;
  const genre = document.getElementById("genre").value;

  await updateDoc(doc(db, "inventory", id), {
    judul: judul,
    artis: artis,
    genre: genre
  });

  window.location.href = "daftar.html";
}
 const inventory = document.getElementById("inventory");
