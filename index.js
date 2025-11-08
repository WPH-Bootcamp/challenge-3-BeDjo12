let prompt = require("prompt-sync")();

function getValidNumberInput(prompMessage) {
  let num;
  let flag = 0;
  do {
    flag++;
    // Pesan error number salah input setelah percobaan pertama (flag > 1)
    if (flag > 1)
      console.log("Input tidak valid, silakan masukkan angka yang benar.");
    num = prompt(prompMessage);
  } while (isNaN(num) || num.trim() === "");
  return parseFloat(num);
}

function getValidOperatorInput() {
  let operator;
  const getValidOperatorInput = ["+", "-", "*", "/", "%", "**"];
  let flag = 0;

  do {
    flag++;
    // Pesan error operator salah input setelah percobaan pertama (flag > 1)
    if (flag > 1) {
      if (operator.trim() === "") {
        console.log("Input tidak boleh kosong. Silahkan masukan pilihan.");
      } else if (!getValidOperatorInput.includes(operator)) {
        console.log(
          "Operasi tidak valid. Silahkan masukan pilihan (+, -, *, /, %, **)."
        );
      }
    }

    operator = prompt("Masukan operasi (+, -, *, /, %, **): ");
  } while (!getValidOperatorInput.includes(operator) || operator.trim() === "");

  return operator;
}

// function hitung
function calculation(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        return "tidak terdefinisi";
      }
      return a / b;
    case "%":
      if (b === 0) {
        return "tidak terdefinisi";
      }
      return a % b;
    case "**":
      return a ** b;
    default:
      return "Operasi tidak valid";
  }
}

console.log("== Kalkulator ==");

while (true) {
  // 1. Input Angka
  let angka1 = getValidNumberInput("Masukan angka pertama: ");
  let angka2 = getValidNumberInput("Masukan angka kedua: ");

  // 2. Input Operator
  let operator = getValidOperatorInput();

  // 3. Hitung Hasil
  let hasil = calculation(angka1, angka2, operator);

  // --- ANALISIS HASIL ---

  console.log("-*_*-");
  console.log(`Hasil dari ${angka1} ${operator} ${angka2} adalah: ${hasil}`);

  // analisis hasil
  console.log(`\n==Analisis Hasil==`);
  const tipeData = typeof hasil;
  console.log(`- Tipe Data: ${tipeData} "${hasil}"`);

  if (tipeData === "number") {
    const isTruthy = hasil === 0 || !!hasil;
    console.log(`- sifat Boolean: ${isTruthy}`);

    // Bilangan Bulat vs pecahan
    const isInteger = Number.isInteger(hasil);
    console.log(
      `- Struktur Angka: ${isInteger ? "Bilangan Bulat" : "Pecahan/Desimal"}`
    );

    // Positif/Negatif/Nol
    let bilangan;
    if (hasil > 0) {
      bilangan = "Positif";
    } else if (hasil < 0) {
      bilangan = "Negatif";
    } else {
      bilangan = "Nol";
    }
    console.log(`- Tanda angka: ${bilangan}`);

    // Cek hanya jika Bilangan Bulat dan Bukan Nol
    if (isInteger && hasil !== 0) {
      const parity = hasil % 2 === 0 ? "Genap" : "Ganjil";
      console.log(`- Bilangan: ${parity}`);
    } else if (isInteger && hasil === 0) {
      // cek angka nol
      console.log(`- Bilangan: Nol`);
    } else {
      // Bilangan Pecahan (isInteger adalah FALSE)
      console.log(`- Bilangan: Pecahan/Desimal (Bukan bilangan bulat).`);
    }

    if (!isInteger) {
      // PECAHAN (Jika isInteger adalah FALSE)
      console.log(`- Kesimpulan: Pecahan ${bilangan}`);
      // Genap isInteger True
    } else if (hasil % 2 === 0) {
      // Nol bukan genap bukan ganjil
      if (hasil === 0) {
        console.log(`- Kesimpulan: Bilangan Nol`);
      } else {
        console.log(`- Kesimpulan: Genap ${bilangan}`);
      }
    } else {
      // KASUS GANJIL (Ini mencakup semua bilangan bulat yang tersisa)
      console.log(`- Kesimpulan: Ganjil ${bilangan}`);
    }
  } else if (tipeData === "string") {
    // Pesan Error untuk String (misalnya, pembagian dengan nol)
    if (hasil.startsWith("Error")) {
      console.log(`**${hasil}**`);
    } else {
      console.log(`--Operasi dihentikan periksa kembali--`);
    }
  }
  // jika hasil `null` atau `undefined`.
  const pesanDefault =
    "Hasilnya tidak terdefinisi atau null, terjadi kesalahan!";
  const hasilNullishCheck = hasil ?? pesanDefault;

  if (hasil === null || hasil === undefined) {
    console.log(`\n${hasilNullishCheck}`);
  }

  console.log("--------------");

  //  pertanyaan untuk Lanjut
  let question = prompt(
    "Tekan sembarang untuk melanjutkan, tekan (y) untuk keluar: "
  );

  if (question.toLowerCase() === "y") {
    console.log("--------------");
    console.log("Terima kasih telah menggunakan kalkulator ini.");
    break;
  }
}

console.log("==Program selesai==");
