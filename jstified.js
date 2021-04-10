var FRAMEDIV = 60,
    CPUSPEED = 6E6,
    STOPPERIOD = CPUSPEED / FRAMEDIV;
CTyE = {
    CTyQ: 0,
    CTyR: 1,
    CTyS: 2,
    CTyT: 3,
    CTyP: 4,
    CALC_TYPE_76FR: 5,
    CALC_TYPE_82STATSFR: 6,
    CALC_TYPE_73: 7,
    CALC_TYPE_82: 8,
    CALC_TYPE_82HW1: 9,
    CALC_TYPE_82HW2: 10,
    CALC_TYPE_81: 11,
    CTySCSE: 12,
    CTySCE: 13
};
PSEnum3 = {
    PORT0: 0,
    PORT2: 1,
    PORT3: 2,
    PORT4: 3
};
PSEnumX = {
    PORT3: 0,
    PORT4: 1,
    PORT5: 2,
    PORT6: 3,
    PORT7: 4,
    PORT8: 5,
    PORT9: 6,
    PORTA: 7,
    PORTB: 8,
    PORTC: 9,
    PORTD: 10,
    PORTE: 11,
    PORTF: 12,
    PORT20: 13,
    PORT21: 14,
    PORT22: 15,
    PORT23: 16,
    PORT25: 17,
    PORT26: 18,
    PORT27: 19,
    PORT28: 20,
    PORT29: 21,
    PORT2A: 22,
    PORT2B: 23,
    PORT2C: 24,
    PORT2D: 25,
    PORT2E: 26,
    PORT2F: 27
};

function i6_struct(c, d) {
    this.bank_c = this.bank_b = this.bank_a = 0;
    this.partner_link = this.link_state = 3;
    this.it_state = this.it_next = this.it_cnt = this.it_active_timer = this.it_active = this.it_mask = this.on_key = 0;
    this.it_times = Array(4);
    this.key_mask = 0;
    this.key_state = Array(7);
    this.key_map = Array(255);
    this.rom_loaded = false;
    this.page = Array(4);
    this.mut = Array(4);
    this.flash_lock = this.mmap = 0;
    this.exc = Array(4);
    this.prot_cnt = 0;
    this.prot_buffer = Array(8);
    this.type = c;
    this.subtype = d;
    switch (c) {
        case CTyE.CALC_TYPE_82:
            this.rompages = 8;
            this.rampages = 2;
            break;
        case CTyE.CTyP:
            this.rompages = 16;
            this.rampages = 2;
            break;
        case CTyE.CTyQ:
            this.rompages = 32;
            this.rampages = 4;
            break;
        case CTyE.CTyT:
        case CTyE.CTyR:
            this.rompages = d == CTyE.CTySCSE ? 256 : 128;
            this.rampages = 8;
            break;
        case CTyE.CTyS:
            this.rompages = 64;
            this.rampages = 8;
            break;
        case CTyE.CTySCE:
            this.rompages = 256, this.rampages = 25
    }
    this.rom = new Uint8Array(16384 * this.rompages);
    this.ram = new Uint8Array(16384 * this.rampages);
    this.run_lock = Array(this.rompages + this.rampages);
    this.priv_page_mask = 252;
    this.priv_page_val = 28;
    c == CTyE.CTyP || c == CTyE.CALC_TYPE_82 ? this.portbuf = Array(4) : c == CTyE.CTySCE ? this.portbuf = new Uint8Array(memports_84pce_buflen) : c != CTyE.CTyQ && (this.portbuf = Array(PSEnumX.PORT2F + 1), this.md5ars = Array(8), this.timer0 = Array(6), this.timer1 = Array(6), this.timer2 = Array(6), this.timer0[5] = 0, this.timer1[5] = 1, this.timer2[5] = 2, this.la_outstamp = -1);
    this.key_map = [];
    this.key_map[27] = 102;
    this.key_map[48] = 64;
    this.key_map[49] = 65;
    this.key_map[50] = 49;
    this.key_map[51] = 33;
    this.key_map[52] = 66;
    this.key_map[53] = 50;
    this.key_map[54] = 34;
    this.key_map[55] = 67;
    this.key_map[56] = 51;
    this.key_map[57] = 35;
    this.key_map[96] = 64;
    this.key_map[97] = 65;
    this.key_map[98] = 49;
    this.key_map[99] = 33;
    this.key_map[100] = 66;
    this.key_map[101] = 50;
    this.key_map[102] = 34;
    this.key_map[103] = 67;
    this.key_map[104] = 51;
    this.key_map[105] = 35;
    this.key_map[173] = 32;
    this.key_map[187] = 17;
    this.key_map[189] = 32;
    this.key_map[61] = 17;
    this.key_map[69] = 69;
    this.key_map[73] = 84;
    this.key_map[79] = 67;
    this.key_map[80] = 51;
    this.key_map[81] = 35;
    this.key_map[87] = 18;
    this.key_map[82] = 19;
    this.key_map[84] = 66;
    this.key_map[89] = 65;
    this.key_map[85] = 50;
    this.key_map[219] = 52;
    this.key_map[221] = 36;
    this.key_map[13] = 16;
    this.key_map[17] = 87;
    this.key_map[65] = 86;
    this.key_map[83] = 82;
    this.key_map[68] = 85;
    this.key_map[70] = 53;
    this.key_map[71] = 37;
    this.key_map[72] = 21;
    this.key_map[74] = 68;
    this.key_map[75] = 52;
    this.key_map[76] = 36;
    this.key_map[16] = 101;
    this.key_map[192] = 71;
    this.key_map[90] = 49;
    this.key_map[88] = 81;
    this.key_map[67] = 54;
    this.key_map[86] = 34;
    this.key_map[66] = 70;
    this.key_map[78] = 83;
    this.key_map[77] = 20;
    this.key_map[188] = 68;
    this.key_map[190] = 48;
    this.key_map[111] = 20;
    this.key_map[191] = 22;
    this.key_map[106] = 19;
    this.key_map[32] = 64;
    this.key_map[112] = 100;
    this.key_map[113] = 99;
    this.key_map[114] = 98;
    this.key_map[115] = 97;
    this.key_map[116] = 96;
    this.key_map[117] = 128;
    this.key_map[128] = 128;
    this.key_map[36] = 86;
    this.key_map[38] = 3;
    this.key_map[33] = 70;
    this.key_map[109] = 18;
    this.key_map[37] = 1;
    this.key_map[39] = 2;
    this.key_map[107] = 17;
    this.key_map[35] = 55;
    this.key_map[40] = 0;
    this.key_map[34] = 54;
    this.key_map[45] = 38;
    this.key_map[46] = 103;

    this.loadrom = function (c) {
        for (var i = 0; i < c.length; ++i) i6.rom[i] = c.charCodeAt(i);
        this.rom_loaded = true;
    };

    this.powered = function () {
        return this.it_mask & 8 || !z8.halted;
    };
}

function i6_key(tiKeyCode, down) {
    if (tiKeyCode === 128) {
        if (down) {
            if (!i6.on_key) {
                i6.on_key = 1;
                i6.it_active |= i6.it_mask & 1;
            }
        } else {
            i6.on_key = 0;
        }
    } else {
        i6.key_state[tiKeyCode >> 4] = down ?
            i6.key_state[tiKeyCode >> 4] & ~(1 << (tiKeyCode & 7)) :
            i6.key_state[tiKeyCode >> 4] | 1 << (tiKeyCode & 7);
    }
}

function i6_run() {
    for (;;) {
        for (; i6.it_cnt < i6.it_next && !i6.it_active && !i6.it_active_timer && emu.stop_cnt < emu.stop_period && true && 2 > z8.halted;) z8_step();
        if (2 == z8.halted) i6_reset();
        if (emu.stop_cnt >= emu.stop_period) break;
        if (i6.it_active_timer) z8_interrupt_fire();
        else switch (4 * (0 != i6.it_active) + 2 * (i6.it_cnt >= i6.it_next) + z8.halted) {
            case 0:
                z8_step();
                break;
            case 1:
                if (i6.it_mask & 6 && emu.stop_period - emu.stop_cnt > i6.it_next - i6.it_cnt) tss +=
                    i6.it_next - i6.it_cnt, emu.stop_cnt += i6.it_next - i6.it_cnt, i6.it_cnt = i6.it_next;
                else {
                    tss += emu.stop_period - emu.stop_cnt;
                    i6.it_cnt += emu.stop_period - emu.stop_cnt;
                    emu.stop_cnt = emu.stop_period;
                    return
                }
                break;
            case 2:
            case 3:
            case 6:
            case 7:
                switch (i6.it_state) {
                    case 0:
                    case 1:
                        i6.it_active |= i6.it_mask & (i6.it_mask & 8 || !z8.halted ? 4 : 0);
                        break;
                    case 2:
                        i6.it_active |= i6.it_mask & (i6.it_mask & 8 || !z8.halted ? 2 : 0);
                        break;
                    case 3:
                        i6.it_cnt -= i6.it_next
                }
                i6.it_state =
                    i6.it_state + 1 & 3;
                i6.it_next = i6.it_times[i6.it_state];
                if (!i6.it_active) break;
            case 4:
            case 5:
                if (z8_interrupt_fire()) return;
        }
    }
}

FTyE = {
    FTyQ: CTyE.CTyQ,
    FTyR: CTyE.CTyR,
    FTyS: CTyE.CTyS,
    FTyT: CTyE.CTyT,
    FTyP: CTyE.CTyP,
    FLASH_TYPE_82: CTyE.CALC_TYPE_82,
    FTyU: CTyE.CTySCSE
};
FlashModeEnum = {
    FLASH_RESET: 0,
    FLASH_CONSUME: 3,
    FLASH_PROGRAM: 19,
    FLASH_ERASEC: 32,
    FLASH_ERASE: 34,
    FLASH_ID: 51
};
var flash_82 = [
        [0, 0, 65536],
        [0, 65536, 65536],
        [0, 131072, 65536],
        [0, 196608, 65536],
        [0, 262144, 65536],
        [0, 327680, 65536],
        [0, 393216, 65536],
        [0, 458752, 65536]
    ],
    flash_83 = [
        [0, 0, 65536],
        [0, 65536, 65536],
        [0, 131072, 65536],
        [0, 196608, 65536],
        [0, 262144, 65536],
        [0, 327680, 65536],
        [0, 393216, 65536],
        [0, 458752, 65536],
        [0, 524288, 65536],
        [0, 589824, 65536],
        [0, 655360, 65536],
        [0, 720896, 65536],
        [0, 786432, 65536],
        [0, 851968, 65536],
        [0, 917504, 65536],
        [0, 983040, 65536]
    ],
    flash_83p = [
        [0, 0, 65536],
        [0, 65536, 65536],
        [0, 131072, 65536],
        [0, 196608, 65536],
        [0, 262144, 65536],
        [0, 327680, 65536],
        [0, 393216, 65536],
        [0, 458752, 32768],
        [0, 491520, 8192],
        [0, 499712, 8192],
        [1, 507904, 16384]
    ],
    flash_84p = [
        [0, 0, 65536],
        [0, 65536, 65536],
        [0, 131072, 65536],
        [0, 196608, 65536],
        [0, 262144, 65536],
        [0, 327680, 65536],
        [0, 393216, 65536],
        [0, 458752, 65536],
        [0, 524288, 65536],
        [0, 589824, 65536],
        [0, 655360, 65536],
        [1, 720896, 65536],
        [0, 786432, 65536],
        [0, 851968, 65536],
        [0, 917504, 65536],
        [0, 983040, 32768],
        [0, 1015808, 8192],
        [0, 1024E3, 8192],
        [1, 1032192, 16384]
    ],
    flash_84pse = [
        [0, 0, 65536],
        [0, 65536, 65536],
        [0, 131072, 65536],
        [0, 196608, 65536],
        [0, 262144, 65536],
        [0, 327680, 65536],
        [0, 393216, 65536],
        [0, 458752, 65536],
        [0, 524288, 65536],
        [0, 589824, 65536],
        [0, 655360, 65536],
        [1, 720896, 65536],
        [0, 786432, 65536],
        [0, 851968, 65536],
        [0, 917504, 65536],
        [0, 983040, 65536],
        [0, 1048576, 65536],
        [0, 1114112, 65536],
        [0, 1179648, 65536],
        [0, 1245184, 65536],
        [0, 1310720, 65536],
        [0, 1376256, 65536],
        [0, 1441792, 65536],
        [0, 1507328, 65536],
        [0, 1572864, 65536],
        [0, 1638400, 65536],
        [0, 1703936, 65536],
        [0, 1769472, 65536],
        [0, 1835008, 65536],
        [0, 1900544, 65536],
        [0, 1966080, 65536],
        [0, 2031616, 32768],
        [0, 2064384, 8192],
        [0, 2072576, 8192],
        [1, 2080768, 16384]
    ],
    flash_84pcse = [
        [0, 0, 65536],
        [0, 65536, 65536],
        [0, 131072, 65536],
        [0, 196608, 65536],
        [0, 262144, 65536],
        [0, 327680, 65536],
        [0, 393216, 65536],
        [0, 458752, 65536],
        [0, 524288, 65536],
        [0, 589824, 65536],
        [0, 655360, 65536],
        [1, 720896, 65536],
        [0, 786432, 65536],
        [0, 851968, 65536],
        [0, 917504, 65536],
        [0, 983040, 65536],
        [0, 1048576, 65536],
        [0, 1114112, 65536],
        [0, 1179648, 65536],
        [0, 1245184, 65536],
        [0, 1310720, 65536],
        [0, 1376256, 65536],
        [0, 1441792, 65536],
        [0, 1507328, 65536],
        [0, 1572864, 65536],
        [0, 1638400, 65536],
        [0, 1703936, 65536],
        [0, 1769472, 65536],
        [0, 1835008, 65536],
        [0, 1900544, 65536],
        [0, 1966080, 65536],
        [0, 2031616, 65536],
        [0, 2097152, 65536],
        [0, 2162688, 65536],
        [0, 2228224, 65536],
        [0, 2293760, 65536],
        [0, 2359296, 65536],
        [0, 2424832, 65536],
        [0, 2490368, 65536],
        [0, 2555904, 65536],
        [0, 2621440, 65536],
        [0, 2686976, 65536],
        [0, 2752512, 65536],
        [0, 2818048, 65536],
        [0, 2883584, 65536],
        [0, 2949120, 65536],
        [0, 3014656, 65536],
        [0, 3080192, 65536],
        [0, 3145728, 65536],
        [0, 3211264, 65536],
        [0, 3276800, 65536],
        [0, 3342336, 65536],
        [0, 3407872, 65536],
        [0, 3473408, 65536],
        [0, 3538944, 65536],
        [0, 3604480, 65536],
        [0, 3670016, 65536],
        [0, 3735552, 65536],
        [0, 3801088, 65536],
        [0, 3866624, 65536],
        [0, 3932160, 65536],
        [0, 3997696, 65536],
        [0, 4063232, 65536],
        [0, 4128768, 8192],
        [0, 4136960, 8192],
        [0, 4145152, 8192],
        [0, 4153344, 8192],
        [0, 4161536, 8192],
        [0, 4169728, 8192],
        [1, 4177920, 8192],
        [1, 4186112, 8192]
    ];

function FlashROM() {
    this.pnum = this.mask = this.phase = 0;
    this.mem = [];
    this.pages = [];

    this.erase = function (c) {
        if (!this.pages[c][0]) {
            for (var d = 0; d < this.pages[c][2]; d++) {
                this.mem[this.pages[c][1] + d] = 255;
            }
        }
    };

    this.reset = function (flashtype, rom) {
        this.phase = FlashModeEnum.FLASH_RESET;
        this.mem = rom;
        switch (flashtype) {
            case FTyE.FLASH_TYPE_82:
                this.pages = flash_82;
                this.mask = 131071;
                break;
            case FTyE.FTyP:
                this.pages = flash_83;
                this.mask = 262143;
                break;
            case FTyE.FTyQ:
                this.pages = flash_83p;
                this.mask = 524287;
                break;
            case FTyE.FTyS:
                this.pages = flash_84p;
                this.mask = 1048575;
                break;
            case FTyE.FTyU:
                this.pages = flash_84pcse;
                this.mask = 4194303;
                break;
            default:
                this.pages = flash_84pse;
                this.mask = 2097151;
        }
        this.pnum = this.pages.length;
    };
}
var flash = new FlashROM;

function flash_write(c, d) {
    c &= flash.mask;
    switch (flash.phase & 3) {
        case 0:
            170 == d && 2730 == (c & 4095) ? flash.phase++ : flash.phase = FlashModeEnum.FLASH_RESET;
            break;
        case 1:
            85 == d && 1365 == (c & 4095) ? flash.phase++ : flash.phase = FlashModeEnum.FLASH_RESET;
            break;
        case 2:
            switch (d) {
                case 16:
                    if (flash.phase == FlashModeEnum.FLASH_ERASE && 2730 == (c & 4095)) {
                        for (var f = 0; f < flash.pnum; f++) {
                            flash.erase(f);
                        }
                    }
                    flash.phase = FlashModeEnum.FLASH_RESET;
                    break;
                case 48:
                    if (flash.phase == FlashModeEnum.FLASH_ERASE) {
                        for (f = 0; f < flash.pnum; f++) {
                            if (c < flash.pages[f][1] + flash.pages[f][2]) {
                                flash.erase(f);
                                break;
                            }
                        }
                    }
                    flash.phase = FlashModeEnum.FLASH_RESET;
                    break;
                case 128:
                    flash.phase = FlashModeEnum.FLASH_ERASEC;
                    break;
                case 144:
                    flash.phase = FlashModeEnum.FLASH_ID;
                    i6_mem_chmode(1);
                    break;
                case 160:
                    flash.phase = FlashModeEnum.FLASH_PROGRAM;
            }
            break;
        case 3:
            if (flash.phase == FlashModeEnum.FLASH_ID && 240 == d) {
                flash.phase = FlashModeEnum.FLASH_RESET;
                i6_mem_chmode();
            } else if (flash.phase == FlashModeEnum.FLASH_PROGRAM) {
                flash.mem[c] &= d;
                flash.phase = FlashModeEnum.FLASH_RESET;
            }
    }
}

function arrayBufferToString(arrayBuffer) {
    var chars = "";
    var bytes = new Uint8Array(arrayBuffer);
    for (var i=0; i < bytes.length; ++i) {
        chars += String.fromCharCode(bytes[i]);
    }
    return chars;
}

function LCD(screenElement) {
    this.canvas = screenElement;
    this.canvas.setAttribute("image-rendering", "-webkit-optimize-contrast");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 192, 128);
    this.imageData = this.ctx.getImageData(0, 0, 192, 128);

    this.ctr = this.test = this.amp2 = this.amp = this.w_len = this.on = this.cnt_sel = this.up_dn = this.z = this.y = this.x = 0;
    this.dummy;
    this.dat = [];
    this.wcnt = [];
    this.lcnt = [];
    this.sblk = this.swht = this.amul = this.cmul = this.cblk = this.cwht = this.sdec = this.sinc = this.tjit = this.tmin = this.next_w = 0;
    this.scr = [];
    this.lcd_command = function(c) {
        emu.stop_cnt < this.next_w || (0 == (c & 254) ? this.w_len = c & 1 : 2 == (c & 254) ? this.on = c & 1 : 4 == (c & 252) ? (this.up_dn = c & 1, this.cnt_sel = c >> 1 & 1) : 16 == (c & 248) ? this.amp = c & 3 : 8 == (c & 248) ? this.amp2 = c & 3 : 24 == (c & 248) ?
            (this.test = c >> 2 & 1, this.ctr = 63) : 32 == (c & 224) ? (this.y = c & 31, this.dummy = 1) : 64 == (c & 192) ? this.z = c & 63 : 128 == (c & 192) ? (this.x = c & 63, this.dummy = 1) : 192 == (c & 192) && (this.ctr = c & 63), this.swht = this.cwht + this.cmul * (this.ctr - 32) - this.amul * (this.amp + this.amp2), this.sblk = this.cblk + this.cmul * (this.ctr - 32) - this.amul * (this.amp + this.amp2), this.next_w = 1 < this.tjit ? emu.stop_cnt + this.tmin + Math.floor(Math.random() * this.tjit) : emu.stop_cnt + this.tmin)
    };
    this.lcd_status = function() {
        return (emu.stop_cnt < this.next_w && emu.stop_cnt > this.next_w - this.tmin - this.tjit) << 7 | this.w_len << 6 | this.on << 5 | this.cnt_sel << 1 | this.up_dn
    };
    this.lcd_write = function(c) {
        if (!(emu.stop_cnt < this.next_w)) {
            var d = this.w_len ? 8 : 6,
                f = this.w_len ? 15 : 20,
                e = 120 * this.x + this.y * d,
                g;
            for (g = 0; g < d; g++) this.dat[e] || (this.wcnt[e] += emu.stop_cnt - this.lcnt[e]), this.lcnt[e] = emu.stop_cnt, this.dat[e] = c >> d - g - 1 & 1, e++;
            switch (this.cnt_sel << 1 | this.up_dn) {
                case 0:
                    this.x = (this.x - 1) % 64;
                    break;
                case 1:
                    this.x = (this.x + 1) % 64;
                    break;
                case 2:
                    this.y = (this.y - 1 + f) % f;
                    break;
                case 3:
                    this.y = (this.y + 1) % f
            }
            this.next_w = 1 < this.tjit ? emu.stop_cnt + this.tmin + Math.floor(Math.random() * this.tjit) : emu.stop_cnt + this.tmin
        }
    };
    this.lcd_read = function() {
        if (this.dummy) return this.dummy = 0;
        var c = this.w_len ? 8 : 6,
            d = this.w_len ? 15 : 20,
            f = 120 * this.x + this.y * c,
            e, g;
        for (e = g = 0; e < c; e++) g |= this.dat[f + e] << c - e - 1;
        switch (this.cnt_sel << 1 | this.up_dn) {
            case 0:
                this.x = (this.x - 1) % 64;
                break;
            case 1:
                this.x = (this.x + 1) % 64;
                break;
            case 2:
                this.y = (this.y - 1 + d) % d;
                break;
            case 3:
                this.y = (this.y + 1) % d
        }
        return g
    };
    this.lcd_reset = function(c) {
        var d;
        this.x = this.y = this.z = this.on = this.test = this.amp = this.amp2 = this.next_w = 0;
        this.up_dn = this.cnt_sel = this.w_len = this.dummy = 1;
        for (d = 0; 7680 > d; d++) {
            this.dat[d] = this.wcnt[d] = this.lcnt[d] = 0;
            this.scr[d] = 0;
        }
        this.ctr = 18;
        this.tmin = 25;
        this.tjit = 22;
        this.sinc = 9830.25;
        this.sdec = .07 * 65535;
        this.cwht = 3276.75;
        this.cblk = 65535;
        c == CTyE.CTyQ || c == CTyE.CTyP ? (this.cmul = 3276.75, this.amul = 9830.25) : (this.cmul = 6553.5, this.amul = 7097.4405);
        this.swht = this.cwht + this.cmul * (this.ctr - 32) - this.amul * (this.amp + this.amp2);
        this.sblk = this.cblk + this.cmul * (this.ctr - 32) - this.amul * (this.amp + this.amp2)
    };
    this.lcd_update = function() {
        var c, d, f;
        for (c = 0; 7680 > c; c++) {
            d = (c + 120 * this.z) % 7680;
            if (!this.dat[d]) {
                this.wcnt[d] += emu.stop_cnt - this.lcnt[d];
            }
            f = (this.wcnt[d] << 8) / emu.stop_period;
            f = f * this.swht + (256 - f) * this.sblk >> 8;
            if (this.scr[c] > f) {
                this.scr[c] -= this.sdec;
                if (this.scr[c] < f) this.scr[c] = f;
            } else if (this.scr[c] < f) {
                this.scr[c] += this.sinc;
                if (this.scr[c] > f) this.scr[c] = f;
            }
            if (0 > this.scr[c]) this.scr[c] = 0;
            if (65535 < this.scr[c]) this.scr[c] = 65535;
            this.wcnt[d] = this.lcnt[d] = 0;
        }
        if (0 < this.next_w) {
            this.next_w -= emu.stop_period;
        }
    };
    this.getColorDepth = function() {
        return 4
    };
    this.paintScreen = function () {
        this.ctx.putImageData(this.imageData, 0, 0);
    };
}

var lcd = {};

function rom_type_and_subtype(c) {
    var d = -1;
    var f = -1;
    151552 >= c.length ? (d = CTyE.CALC_TYPE_82, -1 != c.indexOf("OPJ3KMLU", 0) && (f = CTyE.CALC_TYPE_81)) :
    311296 >= c.length ? (d = CTyE.CTyP, -1 != c.indexOf("Termin\u0096", 0) ? f = CTyE.CALC_TYPE_76FR :
    -1 != c.indexOf("Liste\x00Matrice", 0) && (f = CTyE.CALC_TYPE_82STATSFR)) :
    604160 >= c.length ? (d = CTyE.CTyQ, -1 != c.indexOf("GRAPH  EXPLORER  SOFTWARE", 0) && (f = CTyE.CALC_TYPE_73)) :
    1040384 <= c.length && 1054720 >= c.length ? d = CTyE.CTyS :
    2093056 <= c.length && 2314240 >= c.length ? d = "1" < c[100] ? CTyE.CTyT : CTyE.CTyR :
    4186112 <= c.length && 4628480 >= c.length && (d = CTyE.CTyT, f = CTyE.CTySCSE);
    return [d, f];
}

function process_rom(c) {
    var [type, subtype] = rom_type_and_subtype(c);
    console.assert(type != -1);
    i6 = new i6_struct(type, subtype);
    i6.loadrom(c);
}

var tss = 0,
    running = false,
    lastRun = -1,
    autorun = true;

function evt_handlers_init() {
    for (const elem of document.querySelectorAll(".calckey")) {
        elem.style.cursor = "pointer";
        elem.style.pointerEvents = "all";
        elem.style.fill = "red";
        elem.style.fillOpacity = 0.0;
        elem.addEventListener("mousedown", clickKeyDown);
        elem.addEventListener("mouseup", clickKeyUp);
        elem.addEventListener("touchstart", clickKeyDown);
        elem.addEventListener("touchend", clickKeyUp);
    }
    document.addEventListener("keydown", keyboardKeyDown);
    document.addEventListener("keyup", keyboardKeyUp);
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function jsTIfied(config) {
    // config.rom: either a Blob (from an input form element), or a string URL
    // config.files: a list of Blobs and/or strings
    // config.pressKeys: a list of key codes
    // config.canvasElement: a 192x128 canvas element for the LCD display
    lcd = new LCD(config.canvasElement);
    evt_handlers_init();
    z8_init_tables();
    var rom_blob = config.rom;
    if (typeof(config.rom) === "string") {
        let rom_response = await fetch(config.rom);
        rom_blob = await rom_response.blob();
    }
    let rom_string = arrayBufferToString(await rom_blob.arrayBuffer());
    process_rom(rom_string);

    if (i6.type == CTyE.CTyP) {
        ti_common_doreset = i5_reset;
        ti_common_out = i5_out;
        ti_common_in = i5_in;
        ti_common_send_file = i5_send_file;
    } else {
        ti_common_doreset = i6_reset;
        ti_common_out = i6_out;
        ti_common_in = i6_in;
        ti_common_send_file = i6_send_file;
    }
    i6_mem_chmode();
    ti_common_doreset();
    ti83p_init();
    start();
    await timeout(500);
    await press_key(128);
    for (var i = 0; i < config.files.length; ++i) {
        var file_blob = config.files[i];
        if (typeof(config.files[i]) === "string") {
            let file_response = await fetch(config.files[i]);
            file_blob = await file_response.blob();
        }
        let file_string = arrayBufferToString(await file_blob.arrayBuffer());
        await process_file(file_string);
    }
    for (var i = 0; i < config.pressKeys.length; ++i) {
        var ch = config.pressKeys[i];
        await press_key(ch);
    }
}

function frame(c) {
    if (lastRun > c || 50 < c - lastRun || -1 == lastRun) {
        lastRun = c - 1E3 / FRAMEDIV;
    }
    for (; c - lastRun > 1E3 / FRAMEDIV;) {
        i6_run();
        refresh_lcd();
        emu.stop_cnt -= emu.stop_period;
        lastRun += 1E3 / FRAMEDIV;
    }
}

function refresh_lcd() {
    lcd.lcd_update();
    lcd_update_skinned();
}

function start() {
    if (!running) {
        running = true;
        tss = 0;
        run();
    }
}

function run(c) {
    if (running) {
        if (c) frame(c);
        if (emu.full_speed) {
            lastRun = -1;
            setTimeout(function() {
                run((new Date).getTime());
            }, 0);
        } else {
            requestAnimationFrame(run);
        }
    }
}

var KEYHI_ERASE_DELAY = 100;

function EmuCore() {
    this.stop_period = this.stop_cnt = 0;
    this.full_speed = !1;
    this.it_num = 1;
    this.it_cnt = [];
    this.ct_num = 0;
    this.ct_cnt = [];
    this.ct_ids = [];
    this.dbus = 0;
    this.partner_link = this.link_state = 3;
}
var emu = new EmuCore;

i6 = {};

function ti83p_init() {
    flash.mem = i6.rom;
    lcd.paintScreen();
}

async function press_key(keyCode) {
    i6_key(i6.key_map[keyCode], true);
    await timeout(250);
    i6_key(i6.key_map[keyCode], false);
    await timeout(300);
}

function clickKeyDown(e) {
    var tiKeyCode = parseInt(e.target.getAttribute("data-key"));
    i6_key(tiKeyCode, true);
    e.target.style.fillOpacity = 0.4;
}

function clickKeyUp(e) {
    var tiKeyCode = parseInt(e.target.getAttribute("data-key"));
    i6_key(tiKeyCode, false);
    e.target.style.fillOpacity = 0.0;
}

function highlightCalculatorKey(tiKeyCode, down) {
    let elem = document.querySelector('[data-key="0x' + tiKeyCode.toString(16) + '"]');
    if (elem) {
        elem.style.fillOpacity = (down ? 0.4 : 0.0);
    }
}

function keyboardKeyDown(e) {
    let elem = document.activeElement.tagName.toLowerCase();
    if ("input" == elem || "textarea" == elem || "select" == elem) return true;
    if (e.altKey) return false;
    let tiKeyCode = i6.key_map[e.keyCode];
    if (tiKeyCode) {
        highlightCalculatorKey(tiKeyCode, true);
        i6_key(tiKeyCode, true);
        e.preventDefault();
    }
}

function keyboardKeyUp(e) {
    elem = document.activeElement.tagName.toLowerCase();
    if ("input" == elem || "textarea" == elem || "select" == elem) return true;
    if (e.altKey) return false;
    let tiKeyCode = i6.key_map[e.keyCode];
    if (tiKeyCode) {
        highlightCalculatorKey(tiKeyCode, false);
        i6_key(tiKeyCode, false);
        e.preventDefault();
    }
}

function lcd_update_skinned() {
    if (i6.powered()) {
        if (true) {
            for (var c, d = i6.type == CTyE.CALC_TYPE_82, f = lcd.imageData.data, e = 0; 64 > e; e++)
                for (var g = 1536 * e, l = 0; 96 > l; l++) {
                    i = 120 * e + l;
                    adr = (i + 120 * lcd.z) % 7680;
                    lcd.dat[adr] || (lcd.wcnt[adr] += emu.stop_cnt - lcd.lcnt[adr]);
                    c = (lcd.wcnt[adr] << 8) / emu.stop_period;
                    c = c * lcd.swht + (256 - c) * lcd.sblk >> 8;
                    lcd.scr[i] > c ? (lcd.scr[i] -= lcd.sdec, lcd.scr[i] < c && (lcd.scr[i] = c)) : lcd.scr[i] < c && (lcd.scr[i] += lcd.sinc, lcd.scr[i] > c && (lcd.scr[i] = c));
                    0 > lcd.scr[i] && (lcd.scr[i] = 0);
                    65535 <
                        lcd.scr[i] && (lcd.scr[i] = 65535);
                    var h = lcd.scr[i];
                    if (d) c = h / 490, m = h / 446, h /= 1929, f[g] = 134 - c, f[g + 1] = 168 - m, f[g + 2] = 149 - h, f[g + 4] = 141 - c, f[g + 5] = 175 - m, f[g + 6] = 156 - h, f[g + 768] = 141 - c, f[g + 768 + 1] = 175 - m, f[g + 768 + 2] = 156 - h, f[g + 768 + 4] = 148 - c, f[g + 768 + 5] = 182 - m, f[g + 768 + 6] = 163 - h;
                    else {
                        c = h / 852;
                        var m = h / 781,
                            h = h / 979;
                        f[g] = 144 - c;
                        f[g + 1] = 157 - m;
                        f[g + 2] = 125 - h;
                        f[g + 4] = 151 - c;
                        f[g + 5] = 164 - m;
                        f[g + 6] = 130 - h;
                        f[g + 768] = 151 - c;
                        f[g + 768 + 1] = 164 - m;
                        f[g + 768 + 2] = 130 - h;
                        f[g + 768 + 4] = 158 - c;
                        f[g + 768 + 5] = 171 - m;
                        f[g + 768 + 6] = 136 - h
                    }
                    g += 8;
                    lcd.wcnt[adr] = lcd.lcnt[adr] = 0
                }
            if (0 < lcd.next_w) {
                lcd.next_w -= emu.stop_period;
            }
        }
        lcd.paintScreen()
    } else {
        lcd.ctx.fillStyle = "rgb(156,168,134)";
        lcd.ctx.fillRect(0, 0, lcd.canvas.width, lcd.canvas.height);
    }
}

function lcd_update() {
    if (i6.powered()) {
        if (true) {
            for (var c, d = lcd.imageData.data, f = 0; 64 > f; f++)
                for (var e = 1536 * f, g = 0; 96 > g; g++) i = 120 * f + g, adr = (i + 120 * lcd.z) % 7680, lcd.dat[adr] || (lcd.wcnt[adr] += emu.stop_cnt - lcd.lcnt[adr]), c = (lcd.wcnt[adr] << 8) / emu.stop_period, c = c * lcd.swht + (256 - c) * lcd.sblk >> 8, lcd.scr[i] > c ? (lcd.scr[i] -= lcd.sdec, lcd.scr[i] < c && (lcd.scr[i] = c)) : lcd.scr[i] < c && (lcd.scr[i] += lcd.sinc, lcd.scr[i] > c && (lcd.scr[i] = c)), 0 > lcd.scr[i] && (lcd.scr[i] = 0), 65535 < lcd.scr[i] && (lcd.scr[i] = 65535), c = 255 - (lcd.scr[i] >>
                    8), d[e] = c, d[e + 1] = c, d[e + 2] = c, d[e + 4] = c, d[e + 5] = c, d[e + 6] = c, d[e + 768] = c, d[e + 768 + 1] = c, d[e + 768 + 2] = c, d[e + 768 + 4] = c, d[e + 768 + 5] = c, d[e + 768 + 6] = c, e += 8, lcd.wcnt[adr] = lcd.lcnt[adr] = 0;
            0 < lcd.next_w && (lcd.next_w -= emu.stop_period)
        }
        lcd.paintScreen();
    } else {
        lcd.ctx.fillStyle = "rgb(190,190,190)";
        lcd.ctx.fillRect(0, 0, lcd.canvas.width, lcd.canvas.height);
    }
}

function calculator_run_timed(c) {
    var d = emu.stop_period;
    if (emu.stop_cnt + c >= d) {
        c -= d - emu.stop_cnt;
        i6_run();
        lcd_update();
        emu.stop_cnt -= d;
        while (emu.stop_cnt + c >= d) {
            i6_run();
            lcd_update();
            emu.stop_cnt -= d;
            c -= d;
        }
    }
    emu.stop_period = emu.stop_cnt + c;
    i6_run();
    emu.stop_period = d
};

function i6_reset() {
    var c;
    if (i6.rom_loaded) {
        z8_reset();
        z8.r2[Regs2_PC] = 0;
        lcd.lcd_reset(i6.type);
        lcd.cwht = -55704.75;
        lcd.cblk = 6553.5;
        i6.subtype == CTyE.CTySCSE ? flash.reset(i6.subtype, i6.rom) : flash.reset(i6.type, i6.rom);
        emu.stop_cnt = 0;
        emu.stop_period = STOPPERIOD;
        emu.dbus = 254;
        emu.link_state = 3;
        i6.page[0] = -1;
        i6.mut[0] = 0;
        i6.exc[0] = 0;
        i6.mmap = 0;
        switch (i6.type) {
            case CTyE.CTyQ:
                i6.bank_a = 30;
                i6.bank_b = i6.bank_c = 31;
                break;
            case CTyE.CTyS:
                i6.bank_a = 62;
                i6.bank_b = i6.bank_c = 63;
                break;
            case CTyE.CTyR:
            case CTyE.CTyT:
                i6.subtype == CTyE.CTySCSE ? (i6.bank_a = 254, i6.bank_b = i6.bank_c = 255) : (i6.bank_a = 126, i6.bank_b = i6.bank_c = 127)
        }
        i6_swap_rom_page(i6.bank_a, i6.bank_b, i6.bank_c);
        for (c = i6.flash_lock = 0; c < i6.rompages + i6.rampages; c++) i6.run_lock[c] = 0;
        for (c = 0; c < 16384 * i6.rampages; c++) i6.ram[c] = 0;
        i6.it_cnt = emu.it_cnt = 0;
        i6.it_state = 0;
        i6.it_next = 1E5;
        i6.it_active = 0;
        i6.it_active_timer = 0;
        for (c = i6.it_mask = 0; 4 > c; c++) i6.it_times[c] = 1E5 + 1E3 * c;
        i6.prot_cnt = 0;
        i6.link_state = 0;
        i6.on_key = 0;
        i6.key_mask = 255;
        for (c = 0; 7 > c; c++) i6.key_state[c] = 255;
        i6_set_priv_pages();
        for (c = 0; 8 > c; c++) i6.prot_buffer[c] = 255;
        if (i6.type != CTyE.CTyQ) {
            i6.portbuf[PSEnumX.PORT4] = 199;
            i6.portbuf[PSEnumX.PORT8] = 128;
            i6.portbuf[PSEnumX.PORTE] = 1;
            i6.portbuf[PSEnumX.PORTF] = 1;
            i6.portbuf[PSEnumX.PORT20] = 0;
            i6.portbuf[PSEnumX.PORT21] = i6.type == CTyE.CTyS ? 0 : 1;
            i6.portbuf[PSEnumX.PORT22] = 8;
            i6.portbuf[PSEnumX.PORT23] = 41;
            i6.portbuf[PSEnumX.PORT25] = 16;
            i6.portbuf[PSEnumX.PORT26] = 32;
            i6.portbuf[PSEnumX.PORT27] = 0;
            i6.portbuf[PSEnumX.PORT28] = 0;
            i6.portbuf[PSEnumX.PORT29] = 20;
            i6.portbuf[PSEnumX.PORT2A] = 39;
            i6.portbuf[PSEnumX.PORT2B] = 47;
            i6.portbuf[PSEnumX.PORT2C] = 59;
            i6.portbuf[PSEnumX.PORT2D] = 1;
            i6.portbuf[PSEnumX.PORT2E] = 68;
            i6.portbuf[PSEnumX.PORT2F] = 74;
            for (c = 0; 8 > c; c++) i6.md5ars[c] = 0;
            for (c = 0; 4 > c; c++) i6.timer0[c] = 0, i6.timer1[c] = 0, i6.timer2[c] = 0
        }
        i6_mem_chmode();
        var d;
        switch (i6.type) {
            case CTyE.CTyQ:
                d = 491520;
                break;
            case CTyE.CTyS:
                d = 1015808;
                break;
            case CTyE.CTyT:
            case CTyE.CTyR:
                d = i6.subtype == CTyE.CTySCSE ? 4161536 : 2064384
        }
        i6.rom[d] = 0;
        i6.rom[d + 1] = 255;
        i6.rom[d + 8160] = 0;
        i6.rom[d + 8161] = 0;
        i6.rom[d + 8192] = 255;
    } else {
        alert("ROM is not loaded! Something is broken.");
    }
}

function i6_out(c, d) {
    c &= 255;
    switch (i6.type == CTyE.CTyQ ? c & 23 : c) {
        case 0:
            i6.link_state = ~d & 3;
            emu.partner_link = i6.link_state;
            break;
        case 1:
            i6.key_mask = 255 == d ? 255 : i6.key_mask & d;
            break;
        case 2:
            i6.it_active &= d | -24;
            break;
        case 3:
            i6.it_mask = d & 31;
            i6.it_active &= d;
            i6.type != CTyE.CTyQ && (d & 6 ? (i6.timer0[2] &= ~UTEnum.NO_HALT_INT, i6.timer1[2] &= ~UTEnum.NO_HALT_INT, i6.timer2[2] &= ~UTEnum.NO_HALT_INT) : (i6.timer0[2] |= UTEnum.NO_HALT_INT, i6.timer1[2] |=
                UTEnum.NO_HALT_INT, i6.timer2[2] |= UTEnum.NO_HALT_INT));
            break;
        case 4:
            i6.it_times[3] = z8.speed * (3 + ((d & 6) << 1)) / 1620;
            i6.it_times[0] = i6.it_times[3] >> 1;
            i6.it_times[1] = i6.it_times[0] + 1600;
            i6.it_times[2] = i6.it_times[1] + 1200;
            i6.it_next = i6.it_times[i6.it_state];
            i6.mmap = d & 1;
            i6_swap_rom_page(i6.bank_a, i6.bank_b, i6.bank_c);
            break;
        case 5:
            i6.type == CTyE.CTyQ ? i6.flash_lock = i6.flash_lock & 1 | (d & 7) << 1 : i6_swap_rom_page(i6.bank_a, i6.bank_b, d);
            break;
        case 6:
            i6_swap_rom_page(d, i6.bank_b, i6.bank_c);
            break;
        case 7:
            i6_swap_rom_page(i6.bank_a, d, i6.bank_c);
            break;
        case 8:
            !(d & 128) && i6.portbuf[PSEnumX.PORT8] & 128 && (i6.portbuf[PSEnumX.PORT9] = 32, i6.la_outstamp = -1);
            i6.portbuf[PSEnumX.PORT8] = d & 135;
            break;
        case 11:
        case 12:
            i6.portbuf[PSEnumX.PORTB + (c - 11)] = d;
            break;
        case 13:
            i6.portbuf[PSEnumX.PORTD] = d;
            i6.portbuf[PSEnumX.PORT9] &= -35;
            i6.la_outstamp = 1;
            break;
        case 14:
        case 15:
            i6.portbuf[PSEnumX.PORTE + (c - 14)] = d;
            i6_swap_rom_page(i6.bank_a, i6.bank_b, i6.bank_c);
            break;
        case 16:
        case 18:
            lcd.lcd_command(d);
            break;
        case 17:
        case 19:
            lcd.lcd_write(d);
            break;
        case 20:
            i6_protection(20) ? i6.flash_lock = i6.flash_lock & 254 | d & 1 : console.log("Failed unlock attempt with buffer");
            break;
        case 21:
            if (i6.type != CTyE.CTyQ) return 68;
            break;
        case 22:
            if (i6.flash_lock & 1 && i6_protection(22) && i6.type == CTyE.CTyQ) {
                var f;
                switch (i6.flash_lock & 14) {
                    case 0:
                        for (f = 0; 8 > f; f++) i6.run_lock[8 + f] = d >> f & 1;
                        return;
                    case 2:
                        for (f = 0; 8 > f; f++) i6.run_lock[16 + f] = d >> f & 1;
                        return;
                    case 4:
                        for (f = 0; 4 > f; f++) i6.run_lock[24 + f] = d >> f & 1;
                        return;
                    case 14:
                        for (f = 0; 2 > f; f++) i6.run_lock[32 + f] = d >> 5 * f & 1;
                        return
                }
                i6_swap_rom_page(i6.bank_a, i6.bank_b, i6.bank_c)
            }
            break;
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
            f = c - 24;
            i6.md5ars[f] >>= 8;
            i6.md5ars[f] &= 16777215;
            i6.md5ars[f] |= d << 24;
            break;
        case 30:
            i6.md5ars[6] = d;
            break;
        case 31:
            i6.md5ars[7] = d & 3;
            break;
        case 32:
            var e = z8.speed;
            i6.portbuf[PSEnumX.PORT20] = d;
            z8.speed = d & 3 ? 15E6 : 6E6;
            CPUSPEED = z8.speed;
            if (e != z8.speed) {
                for (f = 0; f < emu.ct_cnt.length; f++) emu.ct_cnt[f] *= z8.speed / e;
                emu.stop_period = STOPPERIOD = z8.speed / FRAMEDIV
            }
            case 33:
                if (i6.flash_lock & 1) {
                    i6.portbuf[PSEnumX.PORT21] = d;
                    for (f = 0; f < i6.rampages; f++) i6.run_lock[i6.rompages + f] = 1;
                    for (f = 1; f < i6.rampages; f += 2 << (d >> 4 & 3)) i6.run_lock[i6.rompages + f] = 0
                }
                break;
            case 34:
                i6.flash_lock & 1 && (i6.portbuf[PSEnumX.PORT22] = d);
                break;
            case 35:
                i6.flash_lock &
                    1 && (i6.portbuf[PSEnumX.PORT23] = d);
                break;
            case 37:
                i6.flash_lock & 1 && (i6.portbuf[PSEnumX.PORT25] = d);
                break;
            case 38:
                i6.flash_lock & 1 && (i6.portbuf[PSEnumX.PORT26] = d);
                break;
            case 39:
                i6.portbuf[PSEnumX.PORT27] = 19 < d ? 19 : d;
                i6_mem_chmode();
                break;
            case 40:
                i6.portbuf[PSEnumX.PORT28] = d;
                i6_mem_chmode();
                break;
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47:
                i6.portbuf[PSEnumX.PORT29 + (c - 41)] = d;
                break;
            case 48:
                timer_set_frequency(i6.timer0, d);
                break;
            case 49:
                i6.it_active_timer = 0;
                timer_set_mode(i6.timer0, d);
                break;
            case 50:
                timer_start(i6.timer0, d);
                break;
            case 51:
                timer_set_frequency(i6.timer1, d);
                break;
            case 52:
                i6.it_active_timer = 0;
                timer_set_mode(i6.timer1, d);
                break;
            case 53:
                timer_start(i6.timer1, d);
                break;
            case 54:
                timer_set_frequency(i6.timer2, d);
                break;
            case 55:
                i6.it_active_timer = 0;
                timer_set_mode(i6.timer2, d);
                break;
            case 56:
                timer_start(i6.timer2, d)
    }
}

function i6_in(c) {
    var d = 0;
    c &= 255;
    switch (i6.type == CTyE.CTyQ ? c & 23 : c) {
        case 0:
            return i6.link_state & emu.link_state | (i6.link_state ^ 3) << 4;
        case 1:
            d = 255;
            for (c = 0; 7 > c; c++) i6.key_mask & 1 << c || (d &= i6.key_state[c]);
            break;
        case 2:
            return 67 | i6.flash_lock << 2 & 60 | (i6.type == CTyE.CTyS || i6.type == CTyE.CTyT) << 5 | (i6.type != CTyE.CTyQ) << 7;
        case 3:
            return i6.it_mask;
        case 4:
            d = i6.it_active | (i6.on_key ^ 1) << 3;
            i6.type != CTyE.CTyQ && (i6.timer0[2] & UTEnum.FINISHED_INT && (d |= 32), i6.timer1[2] & UTEnum.FINISHED_INT && (d |= 64), i6.timer2[2] & UTEnum.FINISHED_INT && (d |= 128));
            break;
        case 5:
            if (i6.type != CTyE.CTyQ) return i6.bank_c;
            break;
        case 6:
            return i6.bank_a;
        case 7:
            return i6.bank_b;
        case 8:
            return i6.portbuf[PSEnumX.PORT8];
        case 9:
            return i6.portbuf[PSEnumX.PORT9];
        case 10:
            d = i6.portbuf[PSEnumX.PORTA];
            i6.portbuf[PSEnumX.PORT8] = 0;
            i6.portbuf[PSEnumX.PORT9] &= -82;
            i6.portbuf[PSEnumX.PORT9] |= 32;
            break;
        case 14:
            return i6.portbuf[PSEnumX.PORTE] & 3;
        case 15:
            return i6.portbuf[PSEnumX.PORTE] & 3;
        case 16:
        case 18:
            return lcd.lcd_status();
        case 17:
        case 19:
            return lcd.lcd_read();
        case 20:
        case 21:
        case 23:
            return 255;
        case 22:
            return c = i6.page[z8.r2[Regs2_PC] - 1 >> 14 & 3] - i6.rom >> 14, d = i6.page[z8.r2[Regs2_PC] - 2 >> 14 & 3] - i6.rom >> 14, 28 <= c && 31 >= c && 28 <= d && 31 >= d ? 254 : 255;
        case 28:
        case 29:
        case 30:
        case 31:
            return 255 & md5_calcop(i6.md5ars) >> 8 * (c - 28);
        case 32:
            return i6.portbuf[PSEnumX.PORT20] & 3;
        case 33:
            return i6.subtype == CTyE.CTySCSE ? i6.portbuf[PSEnumX.PORT21] & 51 | 2 : i6.portbuf[PSEnumX.PORT21] & 51 | i6.type != CTyE.CTyS;
        case 34:
            return i6.portbuf[PSEnumX.PORT22];
        case 35:
            return i6.portbuf[PSEnumX.PORT23];
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 46:
        case 47:
            return i6.portbuf[PSEnumX.PORT25 + (c - 37)];
        case 45:
            return i6.portbuf[PSEnumX.PORT2D] & 3;
        case 48:
            return i6.timer0[0];
        case 49:
            return i6.timer0[2];
        case 50:
            return timer_timerval(i6.timer0);
        case 51:
            return i6.timer1[0];
        case 52:
            return i6.timer1[2];
        case 53:
            return timer_timerval(i6.timer1);
        case 54:
            return i6.timer2[0];
        case 55:
            return i6.timer2[2];
        case 56:
            return timer_timerval(i6.timer2);
        case 57:
            return 240;
        case 64:
            return 1;
        case 65:
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
            var d = new Date,
                f = Math.floor(d.getTime() / 1E3),
                f = f - 852076800 - 60 * d.getTimezoneOffset();
            return 255 & f >> (c - 65) % 4 * 8;
        case 76:
            return 34;
        case 77:
            return 165;
        case 85:
            return 31;
        case 86:
            return 0;
        case 87:
            return 80;
        case 11:
        case 12:
        case 13:
        case 20:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
            return 0
    }
    return d
}

function i6_protection(c) {
    c = [0, 0, 237, 86, 243, 211, c];
    var d, f;
    f = 1;
    for (d = 0; 7 > d; d++) f &= c[d] == i6.prot_buffer[i6.prot_cnt + d + 1 & 7];
    return f
}

function i6_set_priv_pages() {
    switch (i6.type) {
        case CTyE.CTyQ:
            i6.priv_page_mask = 252;
            i6.priv_page_val = 28;
            break;
        case CTyE.CTyR:
            i6.priv_page_mask = 252;
            i6.priv_page_val = 124;
            break;
        case CTyE.CTyS:
            i6.priv_page_mask = 252;
            i6.priv_page_val = 60;
            break;
        case CTyE.CTyT:
            i6.subtype == CTyE.CTySCSE ? (i6.priv_page_mask = 236, i6.priv_page_val = 236) : (i6.priv_page_mask = 236, i6.priv_page_val = 108)
    }
}

function i6_ASCIIname(c) {
    cleanname = "";
    for (var d = 0; d < c.length && 0 != c.charCodeAt(d); d++) cleanname += c[d];
    return cleanname
}

function i6_send_file(c, e, resolve) {
    if (e === 0) {
        e = { step: 0 };
    } else {
        e.step = 128;
    }
    if (void 0 === e.init || 0 == e.init) {
        e.init = true;
        e.err = 0;
        e.dat = Array(65536);
        e.cur_load_elemnum = -1;
        e.offset = 57;
        e.stage = 0;
        i6.it_active |= i6.it_mask & 16;
        emu.link_state = 1;
        calculator_run_timed(1E6);
        emu.link_state = 3;
    }
    for (; e.offset < c.length || 0 != e.stage;) {
        if (0 == e.stage) {
            e.lgt = 65535;
            e.lgt = c.charCodeAt(e.offset) + 256 * c.charCodeAt(e.offset + 1);
            e.offset += 2;
            if (65535 == e.lgt) break;
            e.type = 0;
            e.type = c.charCodeAt(e.offset++);
            e.step--;
            e.stage++
        } else if (1 == e.stage) {
            e.cur_load_elemnum = (new Date).getTime().toString();
            e.thisname = i6_ASCIIname(c.slice(e.offset, e.offset + 8));
            e.dat[0] = 35;
            e.dat[1] = 201;
            e.dat[2] = 13;
            e.dat[3] = 0;
            e.dat[4] = e.lgt & 255;
            e.dat[5] = e.lgt >> 8;
            e.dat[6] = e.type;
            e.cs = 0;
            for (var g = 4; 17 > g; g++) 7 <= g && (e.dat[g] = c.charCodeAt(e.offset++)), e.cs = e.cs + e.dat[g] & 65535;
            e.dat[17] = e.cs & 255;
            e.dat[18] = e.cs >> 8 & 255;
            if (link.send_data(e.dat, 19, null, null)) {
                e.err = 1;
                break
            }
            e.offset += 2;
            e.step--;
            e.stage++
        } else if (2 == e.stage) {
            if (115 != link.recv_byte()) {
                e.err = 2;
                break
            }
            if (86 != link.recv_byte()) {
                e.err = 3;
                break
            }
            if (-1 == link.recv_byte()) {
                e.err = 4;
                break
            }
            if (-1 == link.recv_byte()) {
                e.err = 5;
                break
            }
            e.step--;
            e.stage++
        } else if (3 == e.stage) {
            if (115 != (rcvbyte = link.recv_byte(6E6))) {
                e.err = 6;
                break
            }
            if (9 != (rcvbyte = link.recv_byte())) {
                e.err = 7;
                break
            }
            if (-1 == link.recv_byte()) {
                e.err = 8;
                break
            }
            if (-1 == link.recv_byte()) {
                e.err = 9;
                break
            }
            e.step--;
            e.stage++
        } else if (4 == e.stage) {
            e.dat[1] = 86;
            e.dat[2] = 0;
            e.dat[4] = 35;
            e.dat[5] = 21;
            e.dat[6] = e.lgt;
            e.dat[7] = e.lgt >> 8;
            for (g = e.cs = 0; g < e.lgt; g++) e.dat[g + 8] = c.charCodeAt(e.offset++), e.cs = e.cs + e.dat[g + 8] & 65535;
            e.dat[e.lgt + 8] = e.cs & 255;
            e.dat[e.lgt + 9] = e.cs >> 8 & 255;
            e.offset += 2;
            calculator_run_timed(100);
            e.i = 0;
            e.step--;
            e.stage++
        } else if (5 == e.stage) {
            if (e.i < e.lgt + 10) {
                if (retval = link.send_byte(e.dat[e.i], 0 == e.i ? 6E6 : LINKDELAY)) {
                    e.err = g + 1 + .01 * retval;
                    break
                }
                e.i++
            } else e.stage++;
            e.step--
        } else if (6 == e.stage) {
            if (115 != link.recv_byte()) {
                e.err = 11;
                break
            }
            if (86 != link.recv_byte()) {
                e.err = 12;
                break
            }
            if (-1 == link.recv_byte()) {
                e.err = 13;
                break
            }
            if (-1 == link.recv_byte()) {
                e.err = 14;
                break
            }
            e.step--;
            e.stage++
        } else if (7 == e.stage) {
            e.dat[1] = 146;
            calculator_run_timed(100);
            if (link.send_data(e.dat, 4, null, null)) {
                e.err = 15;
                break
            }
            e.step--;
            e.stage = 0;
            if (resolve) resolve();
        }
        if (0 == e.step && 0 < e.stage) {
            setTimeout(function() {
                i6_send_file(c, e, resolve);
            });
            return;
        }
    }
    emu.link_state = 3;
    void 0 !== e.epilog && e.epilog(e.err, e)
}

function i5_reset() {
    var c;
    if (i6.rom_loaded) {
        z8_reset();
        z8.r2[Regs2_PC] = 0;
        lcd.lcd_reset(i6.type);
        lcd.cwht = 3276.75;
        lcd.cblk = 65535;
        flash.reset(i6.type, i6.rom);
        emu.stop_cnt = 0;
        emu.stop_period = STOPPERIOD;
        emu.dbus = 254;
        emu.link_state = 3;
        i6.portbuf[PSEnum3.PORT0] = 176;
        i6.portbuf[PSEnum3.PORT2] = 248;
        i6.portbuf[PSEnum3.PORT3] = 11;
        i6.portbuf[PSEnum3.PORT4] = 0;
        i6.page[0] = -1;
        i6.mut[0] = 0;
        i6.exc[0] = 0;
        i6.mmap = 0;
        i6.bank_a = 0;
        i6.bank_b = 17;
        i6.bank_c = 16;
        i5_swap_rom_page(i6.bank_a, i6.bank_b, i6.bank_c);
        for (c = 0; c < 16384 * i6.rampages; c++) i6.ram[c] = 0;
        i6.it_cnt = emu.it_cnt = 0;
        i6.it_state = 0;
        i6.it_next = 1E5;
        i6.it_active = 0;
        i6.it_active_timer = 0;
        for (c = i6.it_mask = 0; 4 > c; c++) i6.it_times[c] = 1E5 + 1E3 * c;
        i6.link_state = 0;
        i6.on_key = 0;
        i6.key_mask = 255;
        for (c = 0; 7 > c; c++) i6.key_state[c] = 255;
        i6_mem_chmode();
    } else {
        alert("ROM is not loaded! Something is broken.");
    }
}

function i5_out(c, d) {
    d &= 255;
    switch (c & 23) {
        case 0:
            i6.link_state = ~d & 3;
            emu.partner_link = i6.link_state;
            i6.portbuf[PSEnum3.PORT0] = d & 16;
            i5_set_memmap();
            break;
        case 1:
            i6.key_mask = 255 == d ? 255 : i6.key_mask & d;
            break;
        case 2:
            i6.portbuf[PSEnum3.PORT2] = d;
            i5_set_memmap();
            break;
        case 3:
            i6.it_mask = d & 15;
            i6.it_active &= d;
            break;
        case 4:
            i6.portbuf[PSEnum3.PORT4] = d;
            i6.it_times[3] = CPUSPEED * (3 + ((d & 6) << 1)) / 1620;
            i6.it_times[0] = i6.it_times[3] >> 1;
            i6.it_times[1] = i6.it_times[0] +
                1600;
            i6.it_times[2] = i6.it_times[1] + 1200;
            d & 16 && (i6.it_times[0] *= .9, i6.it_times[1] *= .9, i6.it_times[2] *= .9, i6.it_times[3] *= .9);
            i6.it_next = i6.it_times[i6.it_state];
            i5_set_memmap();
            break;
        case 16:
        case 18:
            lcd.lcd_command(d);
            break;
        case 17:
        case 19:
            lcd.lcd_write(d)
    }
}

function i5_in(c) {
    var d = 0;
    switch (c & 23) {
        case 0:
        case 4:
            d = (i6.link_state & emu.link_state) << 2 | i6.link_state | i6.portbuf[PSEnum3.PORT0] & 16;
            break;
        case 1:
            d = 255;
            for (c = 0; 7 > c; c++) i6.key_mask & 1 << c || (d &= i6.key_state[c]);
            break;
        case 2:
            return i6.portbuf[PSEnum3.PORT2];
        case 3:
            return i6.it_active & 7 | (i6.on_key ^ 1) << 3;
        case 16:
        case 18:
            return lcd.lcd_status();
        case 17:
        case 19:
            return lcd.lcd_read();
        case 20:
            return 1
    }
    return d
}

function i5_set_memmap() {
    var c = 0,
        c = i6.portbuf[PSEnum3.PORT2] & 64 ? 16 | i6.portbuf[PSEnum3.PORT2] & 1 : (i6.portbuf[PSEnum3.PORT0] & 16) >> 1 | i6.portbuf[PSEnum3.PORT2] & 7,
        d = 0,
        d = i6.portbuf[PSEnum3.PORT2] & 128 ? 16 | (i6.portbuf[PSEnum3.PORT2] & 8) >> 3 : (i6.portbuf[PSEnum3.PORT2] & 8) >> 3 | (i6.portbuf[PSEnum3.PORT0] & 16) >> 1;
    i6.portbuf[PSEnum3.PORT4] & 1 ? (i6.portbuf[PSEnum3.PORT2] & 64 ? (i6.bank_a = 16, i6.bank_b = 17) : (i6.bank_a = (i6.portbuf[PSEnum3.PORT0] & 16) >> 1, i6.bank_b = c),
        i6.bank_c = d) : (i6.bank_a = c, i6.bank_b = d, i6.bank_c = 16);
    i5_swap_rom_page(i6.bank_a, i6.bank_b, i6.bank_c);
}

function i5_send_file(c, e, resolve) {
    if (e === 0) {
        e = { step: 0 };
    } else {
        e.step = 128;
    }
    if (void 0 === e.init || 0 == e.init) {
        e.init = true;
        e.err = 0;
        e.dat = Array(65536);
        e.cur_load_elemnum = -1;
        e.offset = 57;
        e.stage = 0;
    }
    for (; e.offset < c.length || 0 != e.stage;) {
        if (0 == e.stage) {
            e.lgt = 65535;
            e.lgt = c.charCodeAt(e.offset) + 256 * c.charCodeAt(e.offset + 1);
            e.offset += 2;
            if (65535 == e.lgt) break;
            e.type = 0;
            e.type = c.charCodeAt(e.offset++);
            e.step--;
            e.stage++
        } else if (1 == e.stage) {
            e.cur_load_elemnum = (new Date).getTime().toString();
            e.thisname = i6_ASCIIname(c.slice(e.offset, e.offset + 8));
            e.dat[0] = 3;
            e.dat[1] = 201;
            e.dat[2] = 11;
            e.dat[3] = 0;
            e.dat[4] = e.lgt & 255;
            e.dat[5] = e.lgt >> 8;
            e.dat[6] = e.type;
            e.cs = 0;
            for (var g = 4; 15 > g; g++) 7 <= g && (e.dat[g] = c.charCodeAt(e.offset++)), e.cs = e.cs + e.dat[g] & 65535;
            e.dat[15] = e.cs & 255;
            e.dat[16] = e.cs >> 8 & 255;
            if (link.send_data(e.dat, 17, null, null)) {
                e.err = 1;
                break
            }
            e.offset += 2;
            e.step--;
            e.stage++
        } else if (2 == e.stage) {
            if (131 != link.recv_byte()) {
                e.err = 2;
                break
            }
            if (86 != link.recv_byte()) {
                e.err = 3;
                break
            }
            if (-1 == link.recv_byte()) {
                e.err = 4;
                break
            }
            if (-1 == link.recv_byte()) {
                e.err = 5;
                break
            }
            e.step--;
            e.stage++
        } else if (3 == e.stage) {
            if (131 != (rcvbyte = link.recv_byte(6E6))) {
                e.err = 6;
                break
            }
            if (9 != (rcvbyte = link.recv_byte())) {
                e.err = 7;
                break
            }
            if (-1 == link.recv_byte()) {
                e.err = 8;
                break
            }
            if (-1 == link.recv_byte()) {
                e.err = 9;
                break
            }
            e.step--;
            e.stage++
        } else if (4 == e.stage) {
            e.dat[1] = 86;
            e.dat[2] = 0;
            e.dat[4] = 3;
            e.dat[5] = 21;
            e.dat[6] = e.lgt;
            e.dat[7] = e.lgt >> 8;
            for (g = e.cs = 0; g < e.lgt; g++) e.dat[g + 8] = c.charCodeAt(e.offset++), e.cs = e.cs + e.dat[g + 8] & 65535;
            e.dat[e.lgt + 8] = e.cs & 255;
            e.dat[e.lgt + 9] = e.cs >> 8 & 255;
            e.offset += 2;
            calculator_run_timed(100);
            e.i = 0;
            e.step--;
            e.stage++
        } else if (5 == e.stage) {
            if (e.i < e.lgt + 10) {
                if (retval = link.send_byte(e.dat[e.i], 0 == e.i ? 6E6 : LINKDELAY)) {
                    e.err = g + 1 + .01 * retval;
                    break
                }
                e.i++
            } else e.stage++;
            e.step--
        } else if (6 == e.stage) {
            if (131 != link.recv_byte()) {
                e.err = 11;
                break
            }
            if (86 != link.recv_byte()) {
                e.err = 12;
                break
            }
            if (-1 == link.recv_byte()) {
                e.err = 13;
                break
            }
            if (-1 == link.recv_byte()) {
                e.err = 14;
                break
            }
            e.step--;
            e.stage++
        } else if (7 == e.stage) {
            e.dat[1] = 146;
            calculator_run_timed(100);
            if (link.send_data(e.dat, 4, null, null)) {
                e.err = 15;
                break
            }
            e.step--;
            e.stage = 0;
            if (resolve) resolve();
        }
        if (0 == e.step && 0 < e.stage) {
            setTimeout(function() {
                i5_send_file(c, e, resolve);
            });
            return
        }
    }
    emu.link_state = 3;
    void 0 !== e.epilog && e.epilog(e.err, e)
}

var hcat_ = [0, 16, 16, 16, 0, 0, 0, 16],
    hcst_ = [0, 0, 16, 0, 16, 0, 16, 16],
    oAt = [0, 0, 0, 4, 4, 0, 0, 0],
    oSt = [0, 4, 0, 0, 0, 0, 4, 0],
    zTe5 = new Uint8Array(256),
    parity_table = new Uint8Array(256),
    zTe6 = new Uint8Array(256),
    bfi_table = new Uint8Array(256),
    bfd_table = new Uint8Array(256);
REGS_8BIT = 23;
REGS_16BIT = 2;
var Regs_A = 0,
    Regs_F = 1,
    Regs_B = 2,
    Regs_C = 3,
    Regs_D = 4,
    Regs_E = 5,
    Regs_H = 6,
    Regs_L = 7,
    Regs_A_ = 8,
    Regs_F_ = 9,
    Regs_B_ = 10,
    Regs_C_ = 11,
    Regs_D_ = 12,
    Regs_E_ = 13,
    Regs_H_ = 14,
    Regs_L_ = 15,
    Regs_IXH = 16,
    Regs_IXL = 17,
    Regs_IYH = 18,
    Regs_IYL = 19,
    Regs_I = 20,
    Regs_R = 21,
    Regs_R7 = 22,
    Regs2_SP = 0,
    Regs2_PC = 1;

function z8_struct() {
    this.r = new Uint8Array(REGS_8BIT);
    this.r2 = new Uint16Array(REGS_16BIT);
    this.im = this.iff2 = this.iff1 = 0;
    this.halted = !1;
    this.speed = 6E6;
    this.breaks = 0;
    this.breakp = [];
    this.breakim = !1;
    this.watches = {};
}
var z8 = new z8_struct;

function z8_init_tables() {
    var c, d, f, e;
    for (c = 0; 256 > c; c++) {
        zTe5[c] = c & 168;
        d = c;
        for (f = e = 0; 8 > f; f++) e ^= d & 1, d >>= 1;
        parity_table[c] = e ? 0 : 4;
        zTe6[c] = zTe5[c] | parity_table[c]
    }
    zTe5[0] |= 64;
    zTe6[0] |= 64;
    for (c = 0; 256 > c; c++) bfi_table[c] = (128 == c ? 4 : 0) | (c & 15 ? 0 : 16) | zTe5[c], bfd_table[c] = (c + 1 & 15 ? 0 : 16) | 2 | (127 == c ? 4 : 0) | zTe5[c]
}

function z8_reset() {
    z8.r[Regs_A] = z8.r[Regs_F] = z8.r[Regs_B] = z8.r[Regs_C] = z8.r[Regs_D] = z8.r[Regs_E] = z8.r[Regs_H] = z8.r[Regs_L] = 0;
    z8.r[Regs_A_] = z8.r[Regs_F_] = z8.r[Regs_B_] = z8.r[Regs_C_] = z8.r[Regs_D_] = z8.r[Regs_E_] = z8.r[Regs_H_] = z8.r[Regs_L_] = 0;
    z8.r[Regs_IXH] = z8.r[Regs_IXL] = z8.r[Regs_IYH] = z8.r[Regs_IYL] = 0;
    z8.r[Regs_I] = z8.r[Regs_R] = z8.r[Regs_R7] = 0;
    z8.r2[Regs2_SP] = 65535;
    z8.r2[Regs2_PC] = 0;
    z8.iff1 = z8.iff2 = 0;
    z8.im = 1;
    z8.halted = 0;
    z8.ie = 0;
    CPUSPEED = 6E6;
    z8.speed = CPUSPEED;
    STOPPERIOD = CPUSPEED / FRAMEDIV;
}

function z8_interrupt_force() {
    z8_interrupt()
}

function z8_interrupt_fire() {
    z8.ie && z8_step();
    if (z8.iff1) emu.dbus = Math.floor(256 * Math.random()), z8_interrupt_force();
    else {
        if (z8.halted) return emu.stop_cnt = emu.stop_period, 1;
        z8_step()
    }
    return 0
}

function z8_interrupt() {
    if (z8.iff1) switch (z8.halted && (z8.r2[Regs2_PC]++, z8.r2[Regs2_PC] &= 65535, z8.halted = !1), z8.iff1 = z8.iff2 = 0, z8.r2[Regs2_SP] = z8.r2[Regs2_SP] - 1 & 65535, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8), z8.r2[Regs2_SP] = z8.r2[Regs2_SP] - 1 & 65535, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255), z8.r[Regs_R] = z8.r[Regs_R] + 1 & 127, z8.im) {
        case 0:
            z8.r2[Regs2_PC] = 56;
            tss += 12;
            break;
        case 1:
            z8.r2[Regs2_PC] = 56;
            tss += 13;
            break;
        case 2:
            var c = 256 * z8.r[Regs_I] + 255,
                d = wQj(c++),
                c = wQj(c & 65535);
            z8.r2[Regs2_PC] = d | c << 8;
            tss += 19
    }
};

function sXd(c) {
    return 128 > c ? c : c - 256
}

var showall = !1,
    z8_step = z8_step_one;

function z8_step_chmode() {
    z8_step = z8_step_one;
}

function z8_step_one() {
    var c, d = tss;
    tss += 4;
    z8.r[Regs_R] = z8.r[Regs_R] + 1 & 127;
    c = wQj(z8.r2[Regs2_PC]++);
    z8.r2[Regs2_PC] &= 65535;
    (c = z8oT[c]) || (c = z8oT[z8oT.length - 1]);
    c && c();
    z8.ie >>= 1;
    d = tss - d;
    for (c = 0; c < emu.it_num; c++) i6.it_cnt += d;
    for (c = 0; c < emu.ct_num; c++)
        if (emu.ct_cnt[c] -= d, 0 >= emu.ct_cnt[c]) {
            var f = emu.ct_ids[c];
            emu.ct_ids.splice(c, 1);
            emu.ct_cnt.splice(c, 1);
            emu.ct_num--;
            c--;
            timer_expired(f)
        } emu.stop_cnt += d
}
window.z8oT_c203 = Array(257);
z8oT_c203[0] = function() {
    z8.r[Regs_B] = (z8.r[Regs_B] & 127) << 1 | z8.r[Regs_B] >> 7;
    z8.r[Regs_F] = z8.r[Regs_B] & 1 | zTe6[z8.r[Regs_B]]
};
z8oT_c203[1] = function() {
    z8.r[Regs_C] = (z8.r[Regs_C] & 127) << 1 | z8.r[Regs_C] >> 7;
    z8.r[Regs_F] = z8.r[Regs_C] & 1 | zTe6[z8.r[Regs_C]]
};
z8oT_c203[2] = function() {
    z8.r[Regs_D] = (z8.r[Regs_D] & 127) << 1 | z8.r[Regs_D] >> 7;
    z8.r[Regs_F] = z8.r[Regs_D] & 1 | zTe6[z8.r[Regs_D]]
};
z8oT_c203[3] = function() {
    z8.r[Regs_E] = (z8.r[Regs_E] & 127) << 1 | z8.r[Regs_E] >> 7;
    z8.r[Regs_F] = z8.r[Regs_E] & 1 | zTe6[z8.r[Regs_E]]
};
z8oT_c203[4] = function() {
    z8.r[Regs_H] = (z8.r[Regs_H] & 127) << 1 | z8.r[Regs_H] >> 7;
    z8.r[Regs_F] = z8.r[Regs_H] & 1 | zTe6[z8.r[Regs_H]]
};
z8oT_c203[5] = function() {
    z8.r[Regs_L] = (z8.r[Regs_L] & 127) << 1 | z8.r[Regs_L] >> 7;
    z8.r[Regs_F] = z8.r[Regs_L] & 1 | zTe6[z8.r[Regs_L]]
};
z8oT_c203[6] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 7;
    c = (c & 127) << 1 | c >> 7;
    z8.r[Regs_F] = c & 1 | zTe6[c];
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c)
};
z8oT_c203[7] = function() {
    z8.r[Regs_A] = (z8.r[Regs_A] & 127) << 1 | z8.r[Regs_A] >> 7;
    z8.r[Regs_F] = z8.r[Regs_A] & 1 | zTe6[z8.r[Regs_A]]
};
z8oT_c203[8] = function() {
    z8.r[Regs_F] = z8.r[Regs_B] & 1;
    z8.r[Regs_B] = z8.r[Regs_B] >> 1 | (z8.r[Regs_B] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]]
};
z8oT_c203[9] = function() {
    z8.r[Regs_F] = z8.r[Regs_C] & 1;
    z8.r[Regs_C] = z8.r[Regs_C] >> 1 | (z8.r[Regs_C] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]]
};
z8oT_c203[10] = function() {
    z8.r[Regs_F] = z8.r[Regs_D] & 1;
    z8.r[Regs_D] = z8.r[Regs_D] >> 1 | (z8.r[Regs_D] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]]
};
z8oT_c203[11] = function() {
    z8.r[Regs_F] = z8.r[Regs_E] & 1;
    z8.r[Regs_E] = z8.r[Regs_E] >> 1 | (z8.r[Regs_E] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]]
};
z8oT_c203[12] = function() {
    z8.r[Regs_F] = z8.r[Regs_H] & 1;
    z8.r[Regs_H] = z8.r[Regs_H] >> 1 | (z8.r[Regs_H] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]]
};
z8oT_c203[13] = function() {
    z8.r[Regs_F] = z8.r[Regs_L] & 1;
    z8.r[Regs_L] = z8.r[Regs_L] >> 1 | (z8.r[Regs_L] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]]
};
z8oT_c203[14] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 7;
    z8.r[Regs_F] = c & 1;
    c = c >> 1 | (c & 1) << 7;
    z8.r[Regs_F] |= zTe6[c];
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c)
};
z8oT_c203[15] = function() {
    z8.r[Regs_F] = z8.r[Regs_A] & 1;
    z8.r[Regs_A] = z8.r[Regs_A] >> 1 | (z8.r[Regs_A] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]]
};
z8oT_c203[16] = function() {
    var c = z8.r[Regs_B];
    z8.r[Regs_B] = (z8.r[Regs_B] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = c >> 7 | zTe6[z8.r[Regs_B]]
};
z8oT_c203[17] = function() {
    var c = z8.r[Regs_C];
    z8.r[Regs_C] = (z8.r[Regs_C] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = c >> 7 | zTe6[z8.r[Regs_C]]
};
z8oT_c203[18] = function() {
    var c = z8.r[Regs_D];
    z8.r[Regs_D] = (z8.r[Regs_D] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = c >> 7 | zTe6[z8.r[Regs_D]]
};
z8oT_c203[19] = function() {
    var c = z8.r[Regs_E];
    z8.r[Regs_E] = (z8.r[Regs_E] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = c >> 7 | zTe6[z8.r[Regs_E]]
};
z8oT_c203[20] = function() {
    var c = z8.r[Regs_H];
    z8.r[Regs_H] = (z8.r[Regs_H] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = c >> 7 | zTe6[z8.r[Regs_H]]
};
z8oT_c203[21] = function() {
    var c = z8.r[Regs_L];
    z8.r[Regs_L] = (z8.r[Regs_L] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = c >> 7 | zTe6[z8.r[Regs_L]]
};
z8oT_c203[22] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 7;
    var d = c,
        c = (c & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[c];
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c)
};
z8oT_c203[23] = function() {
    var c = z8.r[Regs_A];
    z8.r[Regs_A] = (z8.r[Regs_A] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = c >> 7 | zTe6[z8.r[Regs_A]]
};
z8oT_c203[24] = function() {
    var c = z8.r[Regs_B];
    z8.r[Regs_B] = z8.r[Regs_B] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = c & 1 | zTe6[z8.r[Regs_B]]
};
z8oT_c203[25] = function() {
    var c = z8.r[Regs_C];
    z8.r[Regs_C] = z8.r[Regs_C] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = c & 1 | zTe6[z8.r[Regs_C]]
};
z8oT_c203[26] = function() {
    var c = z8.r[Regs_D];
    z8.r[Regs_D] = z8.r[Regs_D] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = c & 1 | zTe6[z8.r[Regs_D]]
};
z8oT_c203[27] = function() {
    var c = z8.r[Regs_E];
    z8.r[Regs_E] = z8.r[Regs_E] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = c & 1 | zTe6[z8.r[Regs_E]]
};
z8oT_c203[28] = function() {
    var c = z8.r[Regs_H];
    z8.r[Regs_H] = z8.r[Regs_H] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = c & 1 | zTe6[z8.r[Regs_H]]
};
z8oT_c203[29] = function() {
    var c = z8.r[Regs_L];
    z8.r[Regs_L] = z8.r[Regs_L] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = c & 1 | zTe6[z8.r[Regs_L]]
};
z8oT_c203[30] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 7;
    var d = c,
        c = c >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[c];
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c)
};
z8oT_c203[31] = function() {
    var c = z8.r[Regs_A];
    z8.r[Regs_A] = z8.r[Regs_A] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = c & 1 | zTe6[z8.r[Regs_A]]
};
z8oT_c203[32] = function() {
    z8.r[Regs_F] = z8.r[Regs_B] >> 7;
    z8.r[Regs_B] <<= 1;
    z8.r[Regs_B] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]]
};
z8oT_c203[33] = function() {
    z8.r[Regs_F] = z8.r[Regs_C] >> 7;
    z8.r[Regs_C] <<= 1;
    z8.r[Regs_C] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]]
};
z8oT_c203[34] = function() {
    z8.r[Regs_F] = z8.r[Regs_D] >> 7;
    z8.r[Regs_D] <<= 1;
    z8.r[Regs_D] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]]
};
z8oT_c203[35] = function() {
    z8.r[Regs_F] = z8.r[Regs_E] >> 7;
    z8.r[Regs_E] <<= 1;
    z8.r[Regs_E] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]]
};
z8oT_c203[36] = function() {
    z8.r[Regs_F] = z8.r[Regs_H] >> 7;
    z8.r[Regs_H] <<= 1;
    z8.r[Regs_H] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]]
};
z8oT_c203[37] = function() {
    z8.r[Regs_F] = z8.r[Regs_L] >> 7;
    z8.r[Regs_L] <<= 1;
    z8.r[Regs_L] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]]
};
z8oT_c203[38] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 4;
    tss += 3;
    z8.r[Regs_F] = c >> 7;
    c = c << 1 & 255;
    z8.r[Regs_F] |= zTe6[c];
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c)
};
z8oT_c203[39] = function() {
    z8.r[Regs_F] = z8.r[Regs_A] >> 7;
    z8.r[Regs_A] <<= 1;
    z8.r[Regs_A] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]]
};
z8oT_c203[40] = function() {
    z8.r[Regs_F] = z8.r[Regs_B] & 1;
    z8.r[Regs_B] = z8.r[Regs_B] & 128 | z8.r[Regs_B] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]]
};
z8oT_c203[41] = function() {
    z8.r[Regs_F] = z8.r[Regs_C] & 1;
    z8.r[Regs_C] = z8.r[Regs_C] & 128 | z8.r[Regs_C] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]]
};
z8oT_c203[42] = function() {
    z8.r[Regs_F] = z8.r[Regs_D] & 1;
    z8.r[Regs_D] = z8.r[Regs_D] & 128 | z8.r[Regs_D] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]]
};
z8oT_c203[43] = function() {
    z8.r[Regs_F] = z8.r[Regs_E] & 1;
    z8.r[Regs_E] = z8.r[Regs_E] & 128 | z8.r[Regs_E] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]]
};
z8oT_c203[44] = function() {
    z8.r[Regs_F] = z8.r[Regs_H] & 1;
    z8.r[Regs_H] = z8.r[Regs_H] & 128 | z8.r[Regs_H] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]]
};
z8oT_c203[45] = function() {
    z8.r[Regs_F] = z8.r[Regs_L] & 1;
    z8.r[Regs_L] = z8.r[Regs_L] & 128 | z8.r[Regs_L] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]]
};
z8oT_c203[46] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 7;
    z8.r[Regs_F] = c & 1;
    c = c & 128 | c >> 1;
    z8.r[Regs_F] |= zTe6[c];
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c)
};
z8oT_c203[47] = function() {
    z8.r[Regs_F] = z8.r[Regs_A] & 1;
    z8.r[Regs_A] = z8.r[Regs_A] & 128 | z8.r[Regs_A] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]]
};
z8oT_c203[48] = function() {
    z8.r[Regs_F] = z8.r[Regs_B] >> 7;
    z8.r[Regs_B] = z8.r[Regs_B] << 1 | 1;
    z8.r[Regs_B] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]]
};
z8oT_c203[49] = function() {
    z8.r[Regs_F] = z8.r[Regs_C] >> 7;
    z8.r[Regs_C] = z8.r[Regs_C] << 1 | 1;
    z8.r[Regs_C] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]]
};
z8oT_c203[50] = function() {
    z8.r[Regs_F] = z8.r[Regs_D] >> 7;
    z8.r[Regs_D] = z8.r[Regs_D] << 1 | 1;
    z8.r[Regs_D] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]]
};
z8oT_c203[51] = function() {
    z8.r[Regs_F] = z8.r[Regs_E] >> 7;
    z8.r[Regs_E] = z8.r[Regs_E] << 1 | 1;
    z8.r[Regs_E] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]]
};
z8oT_c203[52] = function() {
    z8.r[Regs_F] = z8.r[Regs_H] >> 7;
    z8.r[Regs_H] = z8.r[Regs_H] << 1 | 1;
    z8.r[Regs_H] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]]
};
z8oT_c203[53] = function() {
    z8.r[Regs_F] = z8.r[Regs_L] >> 7;
    z8.r[Regs_L] = z8.r[Regs_L] << 1 | 1;
    z8.r[Regs_L] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]]
};
z8oT_c203[54] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 7;
    z8.r[Regs_F] = c >> 7;
    c = (c << 1 | 1) & 255;
    z8.r[Regs_F] |= zTe6[c];
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c)
};
z8oT_c203[55] = function() {
    z8.r[Regs_F] = z8.r[Regs_A] >> 7;
    z8.r[Regs_A] = z8.r[Regs_A] << 1 | 1;
    z8.r[Regs_A] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]]
};
z8oT_c203[56] = function() {
    z8.r[Regs_F] = z8.r[Regs_B] & 1;
    z8.r[Regs_B] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]]
};
z8oT_c203[57] = function() {
    z8.r[Regs_F] = z8.r[Regs_C] & 1;
    z8.r[Regs_C] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]]
};
z8oT_c203[58] = function() {
    z8.r[Regs_F] = z8.r[Regs_D] & 1;
    z8.r[Regs_D] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]]
};
z8oT_c203[59] = function() {
    z8.r[Regs_F] = z8.r[Regs_E] & 1;
    z8.r[Regs_E] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]]
};
z8oT_c203[60] = function() {
    z8.r[Regs_F] = z8.r[Regs_H] & 1;
    z8.r[Regs_H] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]]
};
z8oT_c203[61] = function() {
    z8.r[Regs_F] = z8.r[Regs_L] & 1;
    z8.r[Regs_L] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]]
};
z8oT_c203[62] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 7;
    z8.r[Regs_F] = c & 1;
    c >>= 1;
    z8.r[Regs_F] |= zTe6[c];
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c)
};
z8oT_c203[63] = function() {
    z8.r[Regs_F] = z8.r[Regs_A] & 1;
    z8.r[Regs_A] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]]
};
z8oT_c203[64] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_B] & 40;
    z8.r[Regs_B] & 1 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[65] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_C] & 40;
    z8.r[Regs_C] & 1 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[66] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_D] & 40;
    z8.r[Regs_D] & 1 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[67] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_E] & 40;
    z8.r[Regs_E] & 1 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[68] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_H] & 40;
    z8.r[Regs_H] & 1 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[69] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_L] & 40;
    z8.r[Regs_L] & 1 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[70] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 4;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c & 40;
    c & 1 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[71] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_A] & 40;
    z8.r[Regs_A] & 1 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[72] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_B] & 40;
    z8.r[Regs_B] & 2 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[73] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_C] & 40;
    z8.r[Regs_C] & 2 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[74] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_D] & 40;
    z8.r[Regs_D] & 2 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[75] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_E] & 40;
    z8.r[Regs_E] & 2 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[76] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_H] & 40;
    z8.r[Regs_H] & 2 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[77] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_L] & 40;
    z8.r[Regs_L] & 2 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[78] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 4;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c & 40;
    c & 2 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[79] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_A] & 40;
    z8.r[Regs_A] & 2 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[80] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_B] & 40;
    z8.r[Regs_B] & 4 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[81] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_C] & 40;
    z8.r[Regs_C] & 4 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[82] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_D] & 40;
    z8.r[Regs_D] & 4 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[83] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_E] & 40;
    z8.r[Regs_E] & 4 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[84] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_H] & 40;
    z8.r[Regs_H] & 4 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[85] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_L] & 40;
    z8.r[Regs_L] & 4 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[86] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 4;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c & 40;
    c & 4 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[87] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_A] & 40;
    z8.r[Regs_A] & 4 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[88] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_B] & 40;
    z8.r[Regs_B] & 8 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[89] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_C] & 40;
    z8.r[Regs_C] & 8 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[90] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_D] & 40;
    z8.r[Regs_D] & 8 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[91] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_E] & 40;
    z8.r[Regs_E] & 8 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[92] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_H] & 40;
    z8.r[Regs_H] & 8 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[93] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_L] & 40;
    z8.r[Regs_L] & 8 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[94] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 4;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c & 40;
    c & 8 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[95] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_A] & 40;
    z8.r[Regs_A] & 8 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[96] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_B] & 40;
    z8.r[Regs_B] & 16 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[97] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_C] & 40;
    z8.r[Regs_C] & 16 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[98] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_D] & 40;
    z8.r[Regs_D] & 16 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[99] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_E] & 40;
    z8.r[Regs_E] & 16 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[100] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_H] & 40;
    z8.r[Regs_H] & 16 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[101] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_L] & 40;
    z8.r[Regs_L] & 16 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[102] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 4;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c & 40;
    c & 16 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[103] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_A] & 40;
    z8.r[Regs_A] & 16 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[104] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_B] & 40;
    z8.r[Regs_B] & 32 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[105] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_C] & 40;
    z8.r[Regs_C] & 32 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[106] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_D] & 40;
    z8.r[Regs_D] & 32 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[107] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_E] & 40;
    z8.r[Regs_E] & 32 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[108] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_H] & 40;
    z8.r[Regs_H] & 32 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[109] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_L] & 40;
    z8.r[Regs_L] & 32 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[110] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 4;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c & 40;
    c & 32 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[111] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_A] & 40;
    z8.r[Regs_A] & 32 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[112] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_B] & 40;
    z8.r[Regs_B] & 64 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[113] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_C] & 40;
    z8.r[Regs_C] & 64 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[114] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_D] & 40;
    z8.r[Regs_D] & 64 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[115] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_E] & 40;
    z8.r[Regs_E] & 64 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[116] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_H] & 40;
    z8.r[Regs_H] & 64 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[117] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_L] & 40;
    z8.r[Regs_L] & 64 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[118] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 4;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c & 40;
    c & 64 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[119] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_A] & 40;
    z8.r[Regs_A] & 64 || (z8.r[Regs_F] |= 68)
};
z8oT_c203[120] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_B] & 40;
    z8.r[Regs_B] & 128 || (z8.r[Regs_F] |= 68);
    z8.r[Regs_B] & 128 && (z8.r[Regs_F] |= 128)
};
z8oT_c203[121] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_C] & 40;
    z8.r[Regs_C] & 128 || (z8.r[Regs_F] |= 68);
    z8.r[Regs_C] & 128 && (z8.r[Regs_F] |= 128)
};
z8oT_c203[122] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_D] & 40;
    z8.r[Regs_D] & 128 || (z8.r[Regs_F] |= 68);
    z8.r[Regs_D] & 128 && (z8.r[Regs_F] |= 128)
};
z8oT_c203[123] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_E] & 40;
    z8.r[Regs_E] & 128 || (z8.r[Regs_F] |= 68);
    z8.r[Regs_E] & 128 && (z8.r[Regs_F] |= 128)
};
z8oT_c203[124] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_H] & 40;
    z8.r[Regs_H] & 128 || (z8.r[Regs_F] |= 68);
    z8.r[Regs_H] & 128 && (z8.r[Regs_F] |= 128)
};
z8oT_c203[125] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_L] & 40;
    z8.r[Regs_L] & 128 || (z8.r[Regs_F] |= 68);
    z8.r[Regs_L] & 128 && (z8.r[Regs_F] |= 128)
};
z8oT_c203[126] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 4;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c & 40;
    c & 128 || (z8.r[Regs_F] |= 68);
    c & 128 && (z8.r[Regs_F] |= 128)
};
z8oT_c203[127] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | z8.r[Regs_A] & 40;
    z8.r[Regs_A] & 128 || (z8.r[Regs_F] |= 68);
    z8.r[Regs_A] & 128 && (z8.r[Regs_F] |= 128)
};
z8oT_c203[128] = function() {
    z8.r[Regs_B] &= 254
};
z8oT_c203[129] = function() {
    z8.r[Regs_C] &= 254
};
z8oT_c203[130] = function() {
    z8.r[Regs_D] &= 254
};
z8oT_c203[131] = function() {
    z8.r[Regs_E] &= 254
};
z8oT_c203[132] = function() {
    z8.r[Regs_H] &= 254
};
z8oT_c203[133] = function() {
    z8.r[Regs_L] &= 254
};
z8oT_c203[134] = function() {
    tss += 4;
    tss += 3;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) & 254)
};
z8oT_c203[135] = function() {
    z8.r[Regs_A] &= 254
};
z8oT_c203[136] = function() {
    z8.r[Regs_B] &= 253
};
z8oT_c203[137] = function() {
    z8.r[Regs_C] &= 253
};
z8oT_c203[138] = function() {
    z8.r[Regs_D] &= 253
};
z8oT_c203[139] = function() {
    z8.r[Regs_E] &= 253
};
z8oT_c203[140] = function() {
    z8.r[Regs_H] &= 253
};
z8oT_c203[141] = function() {
    z8.r[Regs_L] &= 253
};
z8oT_c203[142] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) & 253)
};
z8oT_c203[143] = function() {
    z8.r[Regs_A] &= 253
};
z8oT_c203[144] = function() {
    z8.r[Regs_B] &= 251
};
z8oT_c203[145] = function() {
    z8.r[Regs_C] &= 251
};
z8oT_c203[146] = function() {
    z8.r[Regs_D] &= 251
};
z8oT_c203[147] = function() {
    z8.r[Regs_E] &= 251
};
z8oT_c203[148] = function() {
    z8.r[Regs_H] &= 251
};
z8oT_c203[149] = function() {
    z8.r[Regs_L] &= 251
};
z8oT_c203[150] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) & 251)
};
z8oT_c203[151] = function() {
    z8.r[Regs_A] &= 251
};
z8oT_c203[152] = function() {
    z8.r[Regs_B] &= 247
};
z8oT_c203[153] = function() {
    z8.r[Regs_C] &= 247
};
z8oT_c203[154] = function() {
    z8.r[Regs_D] &= 247
};
z8oT_c203[155] = function() {
    z8.r[Regs_E] &= 247
};
z8oT_c203[156] = function() {
    z8.r[Regs_H] &= 247
};
z8oT_c203[157] = function() {
    z8.r[Regs_L] &= 247
};
z8oT_c203[158] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) & 247)
};
z8oT_c203[159] = function() {
    z8.r[Regs_A] &= 247
};
z8oT_c203[160] = function() {
    z8.r[Regs_B] &= 239
};
z8oT_c203[161] = function() {
    z8.r[Regs_C] &= 239
};
z8oT_c203[162] = function() {
    z8.r[Regs_D] &= 239
};
z8oT_c203[163] = function() {
    z8.r[Regs_E] &= 239
};
z8oT_c203[164] = function() {
    z8.r[Regs_H] &= 239
};
z8oT_c203[165] = function() {
    z8.r[Regs_L] &= 239
};
z8oT_c203[166] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) & 239)
};
z8oT_c203[167] = function() {
    z8.r[Regs_A] &= 239
};
z8oT_c203[168] = function() {
    z8.r[Regs_B] &= 223
};
z8oT_c203[169] = function() {
    z8.r[Regs_C] &= 223
};
z8oT_c203[170] = function() {
    z8.r[Regs_D] &= 223
};
z8oT_c203[171] = function() {
    z8.r[Regs_E] &= 223
};
z8oT_c203[172] = function() {
    z8.r[Regs_H] &= 223
};
z8oT_c203[173] = function() {
    z8.r[Regs_L] &= 223
};
z8oT_c203[174] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) & 223)
};
z8oT_c203[175] = function() {
    z8.r[Regs_A] &= 223
};
z8oT_c203[176] = function() {
    z8.r[Regs_B] &= 191
};
z8oT_c203[177] = function() {
    z8.r[Regs_C] &= 191
};
z8oT_c203[178] = function() {
    z8.r[Regs_D] &= 191
};
z8oT_c203[179] = function() {
    z8.r[Regs_E] &= 191
};
z8oT_c203[180] = function() {
    z8.r[Regs_H] &= 191
};
z8oT_c203[181] = function() {
    z8.r[Regs_L] &= 191
};
z8oT_c203[182] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) & 191)
};
z8oT_c203[183] = function() {
    z8.r[Regs_A] &= 191
};
z8oT_c203[184] = function() {
    z8.r[Regs_B] &= 127
};
z8oT_c203[185] = function() {
    z8.r[Regs_C] &= 127
};
z8oT_c203[186] = function() {
    z8.r[Regs_D] &= 127
};
z8oT_c203[187] = function() {
    z8.r[Regs_E] &= 127
};
z8oT_c203[188] = function() {
    z8.r[Regs_H] &= 127
};
z8oT_c203[189] = function() {
    z8.r[Regs_L] &= 127
};
z8oT_c203[190] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) & 127)
};
z8oT_c203[191] = function() {
    z8.r[Regs_A] &= 127
};
z8oT_c203[192] = function() {
    z8.r[Regs_B] |= 1
};
z8oT_c203[193] = function() {
    z8.r[Regs_C] |= 1
};
z8oT_c203[194] = function() {
    z8.r[Regs_D] |= 1
};
z8oT_c203[195] = function() {
    z8.r[Regs_E] |= 1
};
z8oT_c203[196] = function() {
    z8.r[Regs_H] |= 1
};
z8oT_c203[197] = function() {
    z8.r[Regs_L] |= 1
};
z8oT_c203[198] = function() {
    tss += 4;
    tss += 3;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) | 1)
};
z8oT_c203[199] = function() {
    z8.r[Regs_A] |= 1
};
z8oT_c203[200] = function() {
    z8.r[Regs_B] |= 2
};
z8oT_c203[201] = function() {
    z8.r[Regs_C] |= 2
};
z8oT_c203[202] = function() {
    z8.r[Regs_D] |= 2
};
z8oT_c203[203] = function() {
    z8.r[Regs_E] |= 2
};
z8oT_c203[204] = function() {
    z8.r[Regs_H] |= 2
};
z8oT_c203[205] = function() {
    z8.r[Regs_L] |= 2
};
z8oT_c203[206] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) | 2)
};
z8oT_c203[207] = function() {
    z8.r[Regs_A] |= 2
};
z8oT_c203[208] = function() {
    z8.r[Regs_B] |= 4
};
z8oT_c203[209] = function() {
    z8.r[Regs_C] |= 4
};
z8oT_c203[210] = function() {
    z8.r[Regs_D] |= 4
};
z8oT_c203[211] = function() {
    z8.r[Regs_E] |= 4
};
z8oT_c203[212] = function() {
    z8.r[Regs_H] |= 4
};
z8oT_c203[213] = function() {
    z8.r[Regs_L] |= 4
};
z8oT_c203[214] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) | 4)
};
z8oT_c203[215] = function() {
    z8.r[Regs_A] |= 4
};
z8oT_c203[216] = function() {
    z8.r[Regs_B] |= 8
};
z8oT_c203[217] = function() {
    z8.r[Regs_C] |= 8
};
z8oT_c203[218] = function() {
    z8.r[Regs_D] |= 8
};
z8oT_c203[219] = function() {
    z8.r[Regs_E] |= 8
};
z8oT_c203[220] = function() {
    z8.r[Regs_H] |= 8
};
z8oT_c203[221] = function() {
    z8.r[Regs_L] |= 8
};
z8oT_c203[222] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) | 8)
};
z8oT_c203[223] = function() {
    z8.r[Regs_A] |= 8
};
z8oT_c203[224] = function() {
    z8.r[Regs_B] |= 16
};
z8oT_c203[225] = function() {
    z8.r[Regs_C] |= 16
};
z8oT_c203[226] = function() {
    z8.r[Regs_D] |= 16
};
z8oT_c203[227] = function() {
    z8.r[Regs_E] |= 16
};
z8oT_c203[228] = function() {
    z8.r[Regs_H] |= 16
};
z8oT_c203[229] = function() {
    z8.r[Regs_L] |= 16
};
z8oT_c203[230] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) | 16)
};
z8oT_c203[231] = function() {
    z8.r[Regs_A] |= 16
};
z8oT_c203[232] = function() {
    z8.r[Regs_B] |= 32
};
z8oT_c203[233] = function() {
    z8.r[Regs_C] |= 32
};
z8oT_c203[234] = function() {
    z8.r[Regs_D] |= 32
};
z8oT_c203[235] = function() {
    z8.r[Regs_E] |= 32
};
z8oT_c203[236] = function() {
    z8.r[Regs_H] |= 32
};
z8oT_c203[237] = function() {
    z8.r[Regs_L] |= 32
};
z8oT_c203[238] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) | 32)
};
z8oT_c203[239] = function() {
    z8.r[Regs_A] |= 32
};
z8oT_c203[240] = function() {
    z8.r[Regs_B] |= 64
};
z8oT_c203[241] = function() {
    z8.r[Regs_C] |= 64
};
z8oT_c203[242] = function() {
    z8.r[Regs_D] |= 64
};
z8oT_c203[243] = function() {
    z8.r[Regs_E] |= 64
};
z8oT_c203[244] = function() {
    z8.r[Regs_H] |= 64
};
z8oT_c203[245] = function() {
    z8.r[Regs_L] |= 64
};
z8oT_c203[246] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) | 64)
};
z8oT_c203[247] = function() {
    z8.r[Regs_A] |= 64
};
z8oT_c203[248] = function() {
    z8.r[Regs_B] |= 128
};
z8oT_c203[249] = function() {
    z8.r[Regs_C] |= 128
};
z8oT_c203[250] = function() {
    z8.r[Regs_D] |= 128
};
z8oT_c203[251] = function() {
    z8.r[Regs_E] |= 128
};
z8oT_c203[252] = function() {
    z8.r[Regs_H] |= 128
};
z8oT_c203[253] = function() {
    z8.r[Regs_L] |= 128
};
z8oT_c203[254] = function() {
    tss += 7;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8) | 128)
};
z8oT_c203[255] = function() {
    z8.r[Regs_A] |= 128
};
z8oT_c203[256] = z8oT_c203[255];
window.z8oT_c221c203 = Array(257);
z8oT_c221c203[0] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    z8.r[Regs_B] = (z8.r[Regs_B] & 127) << 1 | z8.r[Regs_B] >> 7;
    z8.r[Regs_F] = z8.r[Regs_B] & 1 | zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[1] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    z8.r[Regs_C] = (z8.r[Regs_C] & 127) << 1 | z8.r[Regs_C] >> 7;
    z8.r[Regs_F] = z8.r[Regs_C] & 1 | zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[2] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    z8.r[Regs_D] = (z8.r[Regs_D] & 127) << 1 | z8.r[Regs_D] >> 7;
    z8.r[Regs_F] = z8.r[Regs_D] & 1 | zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[3] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    z8.r[Regs_E] = (z8.r[Regs_E] & 127) << 1 | z8.r[Regs_E] >> 7;
    z8.r[Regs_F] = z8.r[Regs_E] & 1 | zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[4] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    z8.r[Regs_H] = (z8.r[Regs_H] & 127) << 1 | z8.r[Regs_H] >> 7;
    z8.r[Regs_F] = z8.r[Regs_H] & 1 | zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[5] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    z8.r[Regs_L] = (z8.r[Regs_L] & 127) << 1 | z8.r[Regs_L] >> 7;
    z8.r[Regs_F] = z8.r[Regs_L] & 1 | zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[6] = function(c) {
    tss += 8;
    var d = wQj(c),
        d = (d & 127) << 1 | d >> 7;
    z8.r[Regs_F] = d & 1 | zTe6[d];
    wQi(c, d)
};
z8oT_c221c203[7] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    z8.r[Regs_A] = (z8.r[Regs_A] & 127) << 1 | z8.r[Regs_A] >> 7;
    z8.r[Regs_F] = z8.r[Regs_A] & 1 | zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[8] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_B] & 1;
    z8.r[Regs_B] = z8.r[Regs_B] >> 1 | (z8.r[Regs_B] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[9] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_C] & 1;
    z8.r[Regs_C] = z8.r[Regs_C] >> 1 | (z8.r[Regs_C] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[10] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_D] & 1;
    z8.r[Regs_D] = z8.r[Regs_D] >> 1 | (z8.r[Regs_D] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[11] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_E] & 1;
    z8.r[Regs_E] = z8.r[Regs_E] >> 1 | (z8.r[Regs_E] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[12] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_H] & 1;
    z8.r[Regs_H] = z8.r[Regs_H] >> 1 | (z8.r[Regs_H] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[13] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_L] & 1;
    z8.r[Regs_L] = z8.r[Regs_L] >> 1 | (z8.r[Regs_L] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[14] = function(c) {
    tss += 8;
    var d = wQj(c);
    z8.r[Regs_F] = d & 1;
    d = d >> 1 | (d & 1) << 7;
    z8.r[Regs_F] |= zTe6[d];
    wQi(c, d)
};
z8oT_c221c203[15] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_A] & 1;
    z8.r[Regs_A] = z8.r[Regs_A] >> 1 | (z8.r[Regs_A] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[16] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    var d = z8.r[Regs_B];
    z8.r[Regs_B] = (z8.r[Regs_B] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[17] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    var d = z8.r[Regs_C];
    z8.r[Regs_C] = (z8.r[Regs_C] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[18] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    var d = z8.r[Regs_D];
    z8.r[Regs_D] = (z8.r[Regs_D] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[19] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    var d = z8.r[Regs_E];
    z8.r[Regs_E] = (z8.r[Regs_E] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[20] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    var d = z8.r[Regs_H];
    z8.r[Regs_H] = (z8.r[Regs_H] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[21] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    var d = z8.r[Regs_L];
    z8.r[Regs_L] = (z8.r[Regs_L] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[22] = function(c) {
    tss += 8;
    var d = wQj(c),
        f = (d & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[f];
    wQi(c, f)
};
z8oT_c221c203[23] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    var d = z8.r[Regs_A];
    z8.r[Regs_A] = (z8.r[Regs_A] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[24] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    var d = z8.r[Regs_B];
    z8.r[Regs_B] = z8.r[Regs_B] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[25] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    var d = z8.r[Regs_C];
    z8.r[Regs_C] = z8.r[Regs_C] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[26] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    var d = z8.r[Regs_D];
    z8.r[Regs_D] = z8.r[Regs_D] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[27] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    var d = z8.r[Regs_E];
    z8.r[Regs_E] = z8.r[Regs_E] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[28] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    var d = z8.r[Regs_H];
    z8.r[Regs_H] = z8.r[Regs_H] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[29] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    var d = z8.r[Regs_L];
    z8.r[Regs_L] = z8.r[Regs_L] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[30] = function(c) {
    tss += 8;
    var d = wQj(c),
        f = d >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[f];
    wQi(c, f)
};
z8oT_c221c203[31] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    var d = z8.r[Regs_A];
    z8.r[Regs_A] = z8.r[Regs_A] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[32] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_B] >> 7;
    z8.r[Regs_B] <<= 1;
    z8.r[Regs_B] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[33] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_C] >> 7;
    z8.r[Regs_C] <<= 1;
    z8.r[Regs_C] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[34] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_D] >> 7;
    z8.r[Regs_D] <<= 1;
    z8.r[Regs_D] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[35] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_E] >> 7;
    z8.r[Regs_E] <<= 1;
    z8.r[Regs_E] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[36] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_H] >> 7;
    z8.r[Regs_H] <<= 1;
    z8.r[Regs_H] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[37] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_L] >> 7;
    z8.r[Regs_L] <<= 1;
    z8.r[Regs_L] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[38] = function(c) {
    tss += 8;
    var d = wQj(c);
    z8.r[Regs_F] = d >> 7;
    d = d << 1 & 255;
    z8.r[Regs_F] |= zTe6[d];
    wQi(c, d)
};
z8oT_c221c203[39] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_A] >> 7;
    z8.r[Regs_A] <<= 1;
    z8.r[Regs_A] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[40] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_B] & 1;
    z8.r[Regs_B] = z8.r[Regs_B] & 128 | z8.r[Regs_B] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[41] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_C] & 1;
    z8.r[Regs_C] = z8.r[Regs_C] & 128 | z8.r[Regs_C] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[42] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_D] & 1;
    z8.r[Regs_D] = z8.r[Regs_D] & 128 | z8.r[Regs_D] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[43] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_E] & 1;
    z8.r[Regs_E] = z8.r[Regs_E] & 128 | z8.r[Regs_E] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[44] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_H] & 1;
    z8.r[Regs_H] = z8.r[Regs_H] & 128 | z8.r[Regs_H] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[45] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_L] & 1;
    z8.r[Regs_L] = z8.r[Regs_L] & 128 | z8.r[Regs_L] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[46] = function(c) {
    tss += 8;
    var d = wQj(c);
    z8.r[Regs_F] = d & 1;
    d = d & 128 | d >> 1;
    z8.r[Regs_F] |= zTe6[d];
    wQi(c, d)
};
z8oT_c221c203[47] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_A] & 1;
    z8.r[Regs_A] = z8.r[Regs_A] & 128 | z8.r[Regs_A] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[48] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_B] >> 7;
    z8.r[Regs_B] = z8.r[Regs_B] << 1 | 1;
    z8.r[Regs_B] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[49] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_C] >> 7;
    z8.r[Regs_C] = z8.r[Regs_C] << 1 | 1;
    z8.r[Regs_C] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[50] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_D] >> 7;
    z8.r[Regs_D] = z8.r[Regs_D] << 1 | 1;
    z8.r[Regs_D] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[51] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_E] >> 7;
    z8.r[Regs_E] = z8.r[Regs_E] << 1 | 1;
    z8.r[Regs_E] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[52] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_H] >> 7;
    z8.r[Regs_H] = z8.r[Regs_H] << 1 | 1;
    z8.r[Regs_H] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[53] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_L] >> 7;
    z8.r[Regs_L] = z8.r[Regs_L] << 1 | 1;
    z8.r[Regs_L] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[54] = function(c) {
    tss += 8;
    var d = wQj(c);
    z8.r[Regs_F] = d >> 7;
    d = (d << 1 | 1) & 255;
    z8.r[Regs_F] |= zTe6[d];
    wQi(c, d)
};
z8oT_c221c203[55] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_A] >> 7;
    z8.r[Regs_A] = z8.r[Regs_A] << 1 | 1;
    z8.r[Regs_A] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[56] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_B] & 1;
    z8.r[Regs_B] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[57] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_C] & 1;
    z8.r[Regs_C] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[58] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_D] & 1;
    z8.r[Regs_D] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[59] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_E] & 1;
    z8.r[Regs_E] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[60] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_H] & 1;
    z8.r[Regs_H] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[61] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_L] & 1;
    z8.r[Regs_L] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[62] = function(c) {
    tss += 8;
    var d = wQj(c);
    z8.r[Regs_F] = d & 1;
    d >>= 1;
    z8.r[Regs_F] |= zTe6[d];
    wQi(c, d)
};
z8oT_c221c203[63] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_A] & 1;
    z8.r[Regs_A] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[71] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 1 || (z8.r[Regs_F] |= 68)
};
z8oT_c221c203[64] = z8oT_c221c203[71];
z8oT_c221c203[65] = z8oT_c221c203[71];
z8oT_c221c203[66] = z8oT_c221c203[71];
z8oT_c221c203[67] = z8oT_c221c203[71];
z8oT_c221c203[68] = z8oT_c221c203[71];
z8oT_c221c203[69] = z8oT_c221c203[71];
z8oT_c221c203[70] = z8oT_c221c203[71];
z8oT_c221c203[79] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 2 || (z8.r[Regs_F] |= 68)
};
z8oT_c221c203[72] = z8oT_c221c203[79];
z8oT_c221c203[73] = z8oT_c221c203[79];
z8oT_c221c203[74] = z8oT_c221c203[79];
z8oT_c221c203[75] = z8oT_c221c203[79];
z8oT_c221c203[76] = z8oT_c221c203[79];
z8oT_c221c203[77] = z8oT_c221c203[79];
z8oT_c221c203[78] = z8oT_c221c203[79];
z8oT_c221c203[87] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 4 || (z8.r[Regs_F] |= 68)
};
z8oT_c221c203[80] = z8oT_c221c203[87];
z8oT_c221c203[81] = z8oT_c221c203[87];
z8oT_c221c203[82] = z8oT_c221c203[87];
z8oT_c221c203[83] = z8oT_c221c203[87];
z8oT_c221c203[84] = z8oT_c221c203[87];
z8oT_c221c203[85] = z8oT_c221c203[87];
z8oT_c221c203[86] = z8oT_c221c203[87];
z8oT_c221c203[95] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 8 || (z8.r[Regs_F] |= 68)
};
z8oT_c221c203[88] = z8oT_c221c203[95];
z8oT_c221c203[89] = z8oT_c221c203[95];
z8oT_c221c203[90] = z8oT_c221c203[95];
z8oT_c221c203[91] = z8oT_c221c203[95];
z8oT_c221c203[92] = z8oT_c221c203[95];
z8oT_c221c203[93] = z8oT_c221c203[95];
z8oT_c221c203[94] = z8oT_c221c203[95];
z8oT_c221c203[103] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 16 || (z8.r[Regs_F] |= 68)
};
z8oT_c221c203[96] = z8oT_c221c203[103];
z8oT_c221c203[97] = z8oT_c221c203[103];
z8oT_c221c203[98] = z8oT_c221c203[103];
z8oT_c221c203[99] = z8oT_c221c203[103];
z8oT_c221c203[100] = z8oT_c221c203[103];
z8oT_c221c203[101] = z8oT_c221c203[103];
z8oT_c221c203[102] = z8oT_c221c203[103];
z8oT_c221c203[111] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 32 || (z8.r[Regs_F] |= 68)
};
z8oT_c221c203[104] = z8oT_c221c203[111];
z8oT_c221c203[105] = z8oT_c221c203[111];
z8oT_c221c203[106] = z8oT_c221c203[111];
z8oT_c221c203[107] = z8oT_c221c203[111];
z8oT_c221c203[108] = z8oT_c221c203[111];
z8oT_c221c203[109] = z8oT_c221c203[111];
z8oT_c221c203[110] = z8oT_c221c203[111];
z8oT_c221c203[119] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 64 || (z8.r[Regs_F] |= 68)
};
z8oT_c221c203[112] = z8oT_c221c203[119];
z8oT_c221c203[113] = z8oT_c221c203[119];
z8oT_c221c203[114] = z8oT_c221c203[119];
z8oT_c221c203[115] = z8oT_c221c203[119];
z8oT_c221c203[116] = z8oT_c221c203[119];
z8oT_c221c203[117] = z8oT_c221c203[119];
z8oT_c221c203[118] = z8oT_c221c203[119];
z8oT_c221c203[127] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 128 || (z8.r[Regs_F] |= 68);
    d & 128 && (z8.r[Regs_F] |= 128)
};
z8oT_c221c203[120] = z8oT_c221c203[127];
z8oT_c221c203[121] = z8oT_c221c203[127];
z8oT_c221c203[122] = z8oT_c221c203[127];
z8oT_c221c203[123] = z8oT_c221c203[127];
z8oT_c221c203[124] = z8oT_c221c203[127];
z8oT_c221c203[125] = z8oT_c221c203[127];
z8oT_c221c203[126] = z8oT_c221c203[127];
z8oT_c221c203[128] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 254;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[129] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 254;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[130] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 254;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[131] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 254;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[132] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 254;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[133] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 254;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[134] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 254)
};
z8oT_c221c203[135] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 254;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[136] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 253;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[137] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 253;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[138] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 253;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[139] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 253;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[140] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 253;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[141] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 253;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[142] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 253)
};
z8oT_c221c203[143] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 253;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[144] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 251;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[145] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 251;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[146] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 251;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[147] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 251;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[148] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 251;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[149] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 251;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[150] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 251)
};
z8oT_c221c203[151] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 251;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[152] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 247;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[153] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 247;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[154] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 247;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[155] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 247;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[156] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 247;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[157] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 247;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[158] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 247)
};
z8oT_c221c203[159] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 247;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[160] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 239;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[161] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 239;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[162] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 239;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[163] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 239;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[164] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 239;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[165] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 239;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[166] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 239)
};
z8oT_c221c203[167] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 239;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[168] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 223;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[169] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 223;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[170] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 223;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[171] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 223;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[172] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 223;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[173] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 223;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[174] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 223)
};
z8oT_c221c203[175] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 223;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[176] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 191;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[177] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 191;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[178] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 191;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[179] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 191;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[180] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 191;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[181] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 191;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[182] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 191)
};
z8oT_c221c203[183] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 191;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[184] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 127;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[185] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 127;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[186] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 127;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[187] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 127;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[188] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 127;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[189] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 127;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[190] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 127)
};
z8oT_c221c203[191] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 127;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[192] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 1;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[193] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 1;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[194] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 1;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[195] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 1;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[196] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 1;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[197] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 1;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[198] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 1)
};
z8oT_c221c203[199] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 1;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[200] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 2;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[201] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 2;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[202] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 2;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[203] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 2;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[204] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 2;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[205] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 2;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[206] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 2)
};
z8oT_c221c203[207] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 2;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[208] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 4;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[209] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 4;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[210] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 4;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[211] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 4;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[212] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 4;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[213] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 4;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[214] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 4)
};
z8oT_c221c203[215] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 4;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[216] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 8;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[217] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 8;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[218] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 8;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[219] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 8;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[220] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 8;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[221] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 8;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[222] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 8)
};
z8oT_c221c203[223] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 8;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[224] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 16;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[225] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 16;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[226] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 16;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[227] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 16;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[228] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 16;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[229] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 16;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[230] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 16)
};
z8oT_c221c203[231] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 16;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[232] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 32;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[233] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 32;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[234] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 32;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[235] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 32;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[236] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 32;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[237] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 32;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[238] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 32)
};
z8oT_c221c203[239] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 32;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[240] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 64;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[241] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 64;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[242] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 64;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[243] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 64;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[244] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 64;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[245] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 64;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[246] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 64)
};
z8oT_c221c203[247] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 64;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[248] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 128;
    wQi(c, z8.r[Regs_B])
};
z8oT_c221c203[249] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 128;
    wQi(c, z8.r[Regs_C])
};
z8oT_c221c203[250] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 128;
    wQi(c, z8.r[Regs_D])
};
z8oT_c221c203[251] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 128;
    wQi(c, z8.r[Regs_E])
};
z8oT_c221c203[252] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 128;
    wQi(c, z8.r[Regs_H])
};
z8oT_c221c203[253] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 128;
    wQi(c, z8.r[Regs_L])
};
z8oT_c221c203[254] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 128)
};
z8oT_c221c203[255] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 128;
    wQi(c, z8.r[Regs_A])
};
z8oT_c221c203[256] = z8oT_c221c203[255];
window.z8oT_c221 = Array(251);
z8oT_c221[9] = function() {
    var c = (z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + (z8.r[Regs_C] | z8.r[Regs_B] << 8),
        d = ((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) & 2048) >> 11 | ((z8.r[Regs_C] | z8.r[Regs_B] << 8) & 2048) >> 10 | (c & 2048) >> 9;
    tss += 7;
    z8.r[Regs_IXH] = c >> 8;
    z8.r[Regs_IXL] = c;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | (c & 65536 ? 1 : 0) | c >> 8 & 40 | hcat_[d]
};
z8oT_c221[25] = function() {
    var c = (z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + (z8.r[Regs_E] | z8.r[Regs_D] << 8),
        d = ((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) & 2048) >> 11 | ((z8.r[Regs_E] | z8.r[Regs_D] << 8) & 2048) >> 10 | (c & 2048) >> 9;
    tss += 7;
    z8.r[Regs_IXH] = c >> 8;
    z8.r[Regs_IXL] = c;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | (c & 65536 ? 1 : 0) | c >> 8 & 40 | hcat_[d]
};
z8oT_c221[33] = function() {
    tss += 6;
    z8.r[Regs_IXL] = wQj(z8.r2[Regs2_PC]++);
    z8.r[Regs_IXH] = wQj(z8.r2[Regs2_PC]++)
};
z8oT_c221[34] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    wQi(c++, z8.r[Regs_IXL]);
    wQi(c & 65535, z8.r[Regs_IXH])
};
z8oT_c221[35] = function() {
    tss += 2;
    var c = (z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + 1 & 65535;
    z8.r[Regs_IXH] = c >> 8;
    z8.r[Regs_IXL] = c
};
z8oT_c221[36] = function() {
    z8.r[Regs_IXH] += 1;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (128 == z8.r[Regs_IXH] ? 4 : 0) | (z8.r[Regs_IXH] & 15 ? 0 : 16) | zTe5[z8.r[Regs_IXH]]
};
z8oT_c221[37] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (z8.r[Regs_IXH] & 15 ? 0 : 16) | 2;
    --z8.r[Regs_IXH];
    z8.r[Regs_F] = z8.r[Regs_F] | (127 == z8.r[Regs_IXH] ? 4 : 0) | zTe5[z8.r[Regs_IXH]]
};
z8oT_c221[38] = function() {
    tss += 3;
    z8.r[Regs_IXH] = wQj(z8.r2[Regs2_PC]++)
};
z8oT_c221[41] = function() {
    var c = (z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + (z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8),
        d = ((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) & 2048) >> 11 | ((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) & 2048) >> 10 | (c & 2048) >> 9;
    tss += 7;
    z8.r[Regs_IXH] = c >> 8;
    z8.r[Regs_IXL] = c;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | (c & 65536 ? 1 : 0) | c >> 8 & 40 | hcat_[d]
};
z8oT_c221[42] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    z8.r[Regs_IXL] = wQj(c++);
    z8.r[Regs_IXH] = wQj(c & 65535)
};
z8oT_c221[43] = function() {
    tss += 2;
    var c = (z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) - 1 & 65535;
    z8.r[Regs_IXH] = c >> 8;
    z8.r[Regs_IXL] = c
};
z8oT_c221[44] = function() {
    z8.r[Regs_IXL] += 1;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (128 == z8.r[Regs_IXL] ? 4 : 0) | (z8.r[Regs_IXL] & 15 ? 0 : 16) | zTe5[z8.r[Regs_IXL]]
};
z8oT_c221[45] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (z8.r[Regs_IXL] & 15 ? 0 : 16) | 2;
    --z8.r[Regs_IXL];
    z8.r[Regs_F] = z8.r[Regs_F] | (127 == z8.r[Regs_IXL] ? 4 : 0) | zTe5[z8.r[Regs_IXL]]
};
z8oT_c221[46] = function() {
    tss += 3;
    z8.r[Regs_IXL] = wQj(z8.r2[Regs2_PC]++)
};
z8oT_c221[52] = function() {
    tss += 15;
    var c = (z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535,
        d = wQj(c),
        d = d + 1 & 255;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (128 == d ? 4 : 0) | (d & 15 ? 0 : 16) | zTe5[d];
    wQi(c, d)
};
z8oT_c221[53] = function() {
    tss += 15;
    var c = (z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535,
        d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (d & 15 ? 0 : 16) | 2;
    d = d - 1 & 255;
    z8.r[Regs_F] = z8.r[Regs_F] | (127 == d ? 4 : 0) | zTe5[d];
    wQi(c, d)
};
z8oT_c221[54] = function() {
    tss += 11;
    var c = (z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535;
    wQi(c, wQj(z8.r2[Regs2_PC]++))
};
z8oT_c221[57] = function() {
    var c = (z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + z8.r2[Regs2_SP],
        d = ((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) & 2048) >> 11 | (z8.r2[Regs2_SP] & 2048) >> 10 | (c & 2048) >> 9;
    tss += 7;
    z8.r[Regs_IXH] = c >> 8;
    z8.r[Regs_IXL] = c;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | (c & 65536 ? 1 : 0) | c >> 8 & 40 | hcat_[d]
};
z8oT_c221[68] = function() {
    z8.r[Regs_B] = z8.r[Regs_IXH]
};
z8oT_c221[69] = function() {
    z8.r[Regs_B] = z8.r[Regs_IXL]
};
z8oT_c221[70] = function() {
    tss += 11;
    z8.r[Regs_B] = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c221[76] = function() {
    z8.r[Regs_C] = z8.r[Regs_IXH]
};
z8oT_c221[77] = function() {
    z8.r[Regs_C] = z8.r[Regs_IXL]
};
z8oT_c221[78] = function() {
    tss += 11;
    z8.r[Regs_C] = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c221[84] = function() {
    z8.r[Regs_D] = z8.r[Regs_IXH]
};
z8oT_c221[85] = function() {
    z8.r[Regs_D] = z8.r[Regs_IXL]
};
z8oT_c221[86] = function() {
    tss += 11;
    z8.r[Regs_D] = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c221[92] = function() {
    z8.r[Regs_E] = z8.r[Regs_IXH]
};
z8oT_c221[93] = function() {
    z8.r[Regs_E] = z8.r[Regs_IXL]
};
z8oT_c221[94] = function() {
    tss += 11;
    z8.r[Regs_E] = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c221[96] = function() {
    z8.r[Regs_IXH] = z8.r[Regs_B]
};
z8oT_c221[97] = function() {
    z8.r[Regs_IXH] = z8.r[Regs_C]
};
z8oT_c221[98] = function() {
    z8.r[Regs_IXH] = z8.r[Regs_D]
};
z8oT_c221[99] = function() {
    z8.r[Regs_IXH] = z8.r[Regs_E]
};
z8oT_c221[101] = function() {
    z8.r[Regs_IXH] = z8.r[Regs_IXL]
};
z8oT_c221[100] = z8oT_c221[101];
z8oT_c221[102] = function() {
    tss += 11;
    z8.r[Regs_H] = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c221[103] = function() {
    z8.r[Regs_IXH] = z8.r[Regs_A]
};
z8oT_c221[104] = function() {
    z8.r[Regs_IXL] = z8.r[Regs_B]
};
z8oT_c221[105] = function() {
    z8.r[Regs_IXL] = z8.r[Regs_C]
};
z8oT_c221[106] = function() {
    z8.r[Regs_IXL] = z8.r[Regs_D]
};
z8oT_c221[107] = function() {
    z8.r[Regs_IXL] = z8.r[Regs_E]
};
z8oT_c221[108] = function() {
    z8.r[Regs_IXL] = z8.r[Regs_IXH]
};
z8oT_c221[110] = function() {
    tss += 11;
    z8.r[Regs_L] = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c221[109] = z8oT_c221[110];
z8oT_c221[111] = function() {
    z8.r[Regs_IXL] = z8.r[Regs_A]
};
z8oT_c221[112] = function() {
    tss += 11;
    wQi((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_B])
};
z8oT_c221[113] = function() {
    tss += 11;
    wQi((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_C])
};
z8oT_c221[114] = function() {
    tss += 11;
    wQi((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_D])
};
z8oT_c221[115] = function() {
    tss += 11;
    wQi((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_E])
};
z8oT_c221[116] = function() {
    tss += 11;
    wQi((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_H])
};
z8oT_c221[117] = function() {
    tss += 11;
    wQi((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_L])
};
z8oT_c221[119] = function() {
    tss += 11;
    wQi((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_A])
};
z8oT_c221[124] = function() {
    z8.r[Regs_A] = z8.r[Regs_IXH]
};
z8oT_c221[125] = function() {
    z8.r[Regs_A] = z8.r[Regs_IXL]
};
z8oT_c221[126] = function() {
    tss += 11;
    z8.r[Regs_A] = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c221[132] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_IXH],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IXH] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c221[133] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_IXL],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IXL] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c221[134] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535),
        d = z8.r[Regs_A] + c,
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | hcat_[c & 7] | oAt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c221[140] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_IXH] + (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IXH] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c221[141] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_IXL] + (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IXL] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c221[142] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535),
        d = z8.r[Regs_A] + c + (z8.r[Regs_F] & 1),
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | hcat_[c & 7] | oAt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c221[148] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_IXH],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IXH] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c221[149] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_IXL],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IXL] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c221[150] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535),
        d = z8.r[Regs_A] - c,
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | 2 | hcst_[c & 7] | oSt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c221[156] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_IXH] - (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IXH] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c221[157] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_IXL] - (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IXL] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c221[158] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535),
        d = z8.r[Regs_A] - c - (z8.r[Regs_F] & 1),
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | 2 | hcst_[c & 7] | oSt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c221[164] = function() {
    z8.r[Regs_A] &= z8.r[Regs_IXH];
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT_c221[165] = function() {
    z8.r[Regs_A] &= z8.r[Regs_IXL];
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT_c221[166] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535);
    z8.r[Regs_A] &= c;
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT_c221[172] = function() {
    z8.r[Regs_A] ^= z8.r[Regs_IXH];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT_c221[173] = function() {
    z8.r[Regs_A] ^= z8.r[Regs_IXL];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT_c221[174] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535);
    z8.r[Regs_A] ^= c;
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT_c221[180] = function() {
    z8.r[Regs_A] |= z8.r[Regs_IXH];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT_c221[181] = function() {
    z8.r[Regs_A] |= z8.r[Regs_IXL];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT_c221[182] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535);
    z8.r[Regs_A] |= c;
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT_c221[188] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_IXH],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IXH] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_F] = (c & 256 ? 1 : c ? 0 : 64) | 2 | hcst_[d & 7] | oSt[d >> 4] | z8.r[Regs_IXH] & 40 | c & 128
};
z8oT_c221[189] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_IXL],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IXL] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_F] = (c & 256 ? 1 : c ? 0 : 64) | 2 | hcst_[d & 7] | oSt[d >> 4] | z8.r[Regs_IXL] & 40 | c & 128
};
z8oT_c221[190] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535),
        d = z8.r[Regs_A] - c,
        f = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_F] = (d & 256 ? 1 : d ? 0 : 64) | 2 | hcst_[f & 7] | oSt[f >> 4] | c & 40 | d & 128
};
z8oT_c221[203] = function() {
    tss += 7;
    var c = (z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)),
        d = wQj(z8.r2[Regs2_PC]++);
    (d = z8oT_c221c203[d]) || (d = z8oT_c221c203[z8oT_c221c203.length - 1]);
    d(c)
};
z8oT_c221[225] = function() {
    tss += 6;
    z8.r[Regs_IXL] = wQj(z8.r2[Regs2_SP]++);
    z8.r[Regs_IXH] = wQj(z8.r2[Regs2_SP]++)
};
z8oT_c221[227] = function() {
    var c = wQj(z8.r2[Regs2_SP]),
        d = wQj(z8.r2[Regs2_SP] + 1);
    tss += 15;
    wQi(z8.r2[Regs2_SP] + 1, z8.r[Regs_IXH]);
    wQi(z8.r2[Regs2_SP], z8.r[Regs_IXL]);
    z8.r[Regs_IXL] = c;
    z8.r[Regs_IXH] = d
};
z8oT_c221[229] = function() {
    tss += 7;
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r[Regs_IXH]);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r[Regs_IXL])
};
z8oT_c221[233] = function() {
    z8.r2[Regs2_PC] = z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8
};
z8oT_c221[249] = function() {
    tss += 2;
    z8.r2[Regs2_SP] = z8.r[Regs_IXL] | z8.r[Regs_IXH] << 8
};
z8oT_c221[250] = function() {
    z8.r2[Regs2_PC]--;
    z8.r[Regs_R]--;
    z8.r[Regs_R] &= 127
};
window.z8oT_c237 = Array(189);
z8oT_c237[64] = function() {
    tss += 4;
    z8.r[Regs_B] = ti_common_in(z8.r[Regs_C] | z8.r[Regs_B] << 8);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | zTe6[z8.r[Regs_B]]
};
z8oT_c237[65] = function() {
    tss += 4;
    ti_common_out(z8.r[Regs_C] | z8.r[Regs_B] << 8, z8.r[Regs_B])
};
z8oT_c237[66] = function() {
    tss += 7;
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) - (z8.r[Regs_C] | z8.r[Regs_B] << 8) - (z8.r[Regs_F] & 1),
        d = ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 34816) >> 11 | ((z8.r[Regs_C] | z8.r[Regs_B] << 8) & 34816) >> 10 | (c & 34816) >> 9;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c;
    z8.r[Regs_F] = (c & 65536 ? 1 : 0) | 2 | oSt[d >> 4] | z8.r[Regs_H] & 168 | hcst_[d & 7] | (z8.r[Regs_L] | z8.r[Regs_H] << 8 ? 0 : 64)
};
z8oT_c237[67] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    wQi(c++, z8.r[Regs_C]);
    wQi(c & 65535, z8.r[Regs_B])
};
z8oT_c237[124] = function() {
    var c = z8.r[Regs_A];
    z8.r[Regs_A] = 0;
    var d = z8.r[Regs_A] - c,
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | 2 | hcst_[c & 7] | oSt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c237[68] = z8oT_c237[124];
z8oT_c237[76] = z8oT_c237[124];
z8oT_c237[84] = z8oT_c237[124];
z8oT_c237[92] = z8oT_c237[124];
z8oT_c237[100] = z8oT_c237[124];
z8oT_c237[108] = z8oT_c237[124];
z8oT_c237[116] = z8oT_c237[124];
z8oT_c237[125] = function() {
    z8.iff1 = z8.iff2;
    tss += 6;
    var c = wQj(z8.r2[Regs2_SP]++),
        d = wQj(z8.r2[Regs2_SP]++);
    z8.r2[Regs2_PC] = c | d << 8
};
z8oT_c237[69] = z8oT_c237[125];
z8oT_c237[77] = z8oT_c237[125];
z8oT_c237[85] = z8oT_c237[125];
z8oT_c237[93] = z8oT_c237[125];
z8oT_c237[101] = z8oT_c237[125];
z8oT_c237[109] = z8oT_c237[125];
z8oT_c237[117] = z8oT_c237[125];
z8oT_c237[110] = function() {
    z8.im = 0
};
z8oT_c237[70] = z8oT_c237[110];
z8oT_c237[78] = z8oT_c237[110];
z8oT_c237[102] = z8oT_c237[110];
z8oT_c237[71] = function() {
    tss += 1;
    z8.r[Regs_I] = z8.r[Regs_A]
};
z8oT_c237[72] = function() {
    tss += 4;
    z8.r[Regs_C] = ti_common_in(z8.r[Regs_C] | z8.r[Regs_B] << 8);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | zTe6[z8.r[Regs_C]]
};
z8oT_c237[73] = function() {
    tss += 4;
    ti_common_out(z8.r[Regs_C] | z8.r[Regs_B] << 8, z8.r[Regs_C])
};
z8oT_c237[74] = function() {
    tss += 7;
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + (z8.r[Regs_C] | z8.r[Regs_B] << 8) + (z8.r[Regs_F] & 1),
        d = ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 34816) >> 11 | ((z8.r[Regs_C] | z8.r[Regs_B] << 8) & 34816) >> 10 | (c & 34816) >> 9;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c;
    z8.r[Regs_F] = (c & 65536 ? 1 : 0) | oAt[d >> 4] | z8.r[Regs_H] & 168 | hcat_[d & 7] | (z8.r[Regs_L] | z8.r[Regs_H] << 8 ? 0 : 64)
};
z8oT_c237[75] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    z8.r[Regs_C] = wQj(c++);
    z8.r[Regs_B] = wQj(c & 65535)
};
z8oT_c237[79] = function() {
    tss += 1;
    z8.r[Regs_R] = z8.r[Regs_R7] = z8.r[Regs_A]
};
z8oT_c237[80] = function() {
    tss += 4;
    z8.r[Regs_D] = ti_common_in(z8.r[Regs_C] | z8.r[Regs_B] << 8);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | zTe6[z8.r[Regs_D]]
};
z8oT_c237[81] = function() {
    tss += 4;
    ti_common_out(z8.r[Regs_C] | z8.r[Regs_B] << 8, z8.r[Regs_D])
};
z8oT_c237[82] = function() {
    tss += 7;
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) - (z8.r[Regs_E] | z8.r[Regs_D] << 8) - (z8.r[Regs_F] & 1),
        d = ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 34816) >> 11 | ((z8.r[Regs_E] | z8.r[Regs_D] << 8) & 34816) >> 10 | (c & 34816) >> 9;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c;
    z8.r[Regs_F] = (c & 65536 ? 1 : 0) | 2 | oSt[d >> 4] | z8.r[Regs_H] & 168 | hcst_[d & 7] | (z8.r[Regs_L] | z8.r[Regs_H] << 8 ? 0 : 64)
};
z8oT_c237[83] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    wQi(c++, z8.r[Regs_E]);
    wQi(c & 65535, z8.r[Regs_D])
};
z8oT_c237[118] = function() {
    z8.im = 1
};
z8oT_c237[86] = z8oT_c237[118];
z8oT_c237[87] = function() {
    tss += 1;
    z8.r[Regs_A] = z8.r[Regs_I];
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | zTe5[z8.r[Regs_A]] | (z8.iff2 ? 4 : 0)
};
z8oT_c237[88] = function() {
    tss += 4;
    z8.r[Regs_E] = ti_common_in(z8.r[Regs_C] | z8.r[Regs_B] << 8);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | zTe6[z8.r[Regs_E]]
};
z8oT_c237[89] = function() {
    tss += 4;
    ti_common_out(z8.r[Regs_C] | z8.r[Regs_B] << 8, z8.r[Regs_E])
};
z8oT_c237[90] = function() {
    tss += 7;
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + (z8.r[Regs_E] | z8.r[Regs_D] << 8) + (z8.r[Regs_F] & 1),
        d = ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 34816) >> 11 | ((z8.r[Regs_E] | z8.r[Regs_D] << 8) & 34816) >> 10 | (c & 34816) >> 9;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c;
    z8.r[Regs_F] = (c & 65536 ? 1 : 0) | oAt[d >> 4] | z8.r[Regs_H] & 168 | hcat_[d & 7] | (z8.r[Regs_L] | z8.r[Regs_H] << 8 ? 0 : 64)
};
z8oT_c237[91] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    z8.r[Regs_E] = wQj(c++);
    z8.r[Regs_D] = wQj(c & 65535)
};
z8oT_c237[126] = function() {
    z8.im = 2
};
z8oT_c237[94] = z8oT_c237[126];
z8oT_c237[95] = function() {
    tss += 1;
    z8.r[Regs_A] = z8.r[Regs_R] & 127 | z8.r[Regs_R7] & 128;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | zTe5[z8.r[Regs_A]] | (z8.iff2 ? 4 : 0)
};
z8oT_c237[96] = function() {
    tss += 4;
    z8.r[Regs_H] = ti_common_in(z8.r[Regs_C] | z8.r[Regs_B] << 8);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | zTe6[z8.r[Regs_H]]
};
z8oT_c237[97] = function() {
    tss += 4;
    ti_common_out(z8.r[Regs_C] | z8.r[Regs_B] << 8, z8.r[Regs_H])
};
z8oT_c237[98] = function() {
    tss += 7;
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) - (z8.r[Regs_L] | z8.r[Regs_H] << 8) - (z8.r[Regs_F] & 1),
        d = ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 34816) >> 11 | ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 34816) >> 10 | (c & 34816) >> 9;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c;
    z8.r[Regs_F] = (c & 65536 ? 1 : 0) | 2 | oSt[d >> 4] | z8.r[Regs_H] & 168 | hcst_[d & 7] | (z8.r[Regs_L] | z8.r[Regs_H] << 8 ? 0 : 64)
};
z8oT_c237[99] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    wQi(c++, z8.r[Regs_L]);
    wQi(c & 65535, z8.r[Regs_H])
};
z8oT_c237[103] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 10;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, (z8.r[Regs_A] & 15) << 4 | c >> 4);
    z8.r[Regs_A] = z8.r[Regs_A] & 240 | c & 15;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | zTe6[z8.r[Regs_A]]
};
z8oT_c237[104] = function() {
    tss += 4;
    z8.r[Regs_L] = ti_common_in(z8.r[Regs_C] | z8.r[Regs_B] << 8);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | zTe6[z8.r[Regs_L]]
};
z8oT_c237[105] = function() {
    tss += 4;
    ti_common_out(z8.r[Regs_C] | z8.r[Regs_B] << 8, z8.r[Regs_L])
};
z8oT_c237[106] = function() {
    tss += 7;
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + (z8.r[Regs_L] | z8.r[Regs_H] << 8) + (z8.r[Regs_F] & 1),
        d = ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 34816) >> 11 | ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 34816) >> 10 | (c & 34816) >> 9;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c;
    z8.r[Regs_F] = (c & 65536 ? 1 : 0) | oAt[d >> 4] | z8.r[Regs_H] & 168 | hcat_[d & 7] | (z8.r[Regs_L] | z8.r[Regs_H] << 8 ? 0 : 64)
};
z8oT_c237[107] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    z8.r[Regs_L] = wQj(c++);
    z8.r[Regs_H] = wQj(c & 65535)
};
z8oT_c237[111] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 10;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, (c & 15) << 4 | z8.r[Regs_A] & 15);
    z8.r[Regs_A] = z8.r[Regs_A] & 240 | c >> 4;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | zTe6[z8.r[Regs_A]]
};
z8oT_c237[112] = function() {
    tss += 4;
    var c = ti_common_in(z8.r[Regs_C] | z8.r[Regs_B] << 8);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | zTe6[c]
};
z8oT_c237[113] = function() {
    tss += 4;
    ti_common_out(z8.r[Regs_C] | z8.r[Regs_B] << 8, 0)
};
z8oT_c237[114] = function() {
    tss += 7;
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) - z8.r2[Regs2_SP] - (z8.r[Regs_F] & 1),
        d = ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 34816) >> 11 | (z8.r2[Regs2_SP] & 34816) >> 10 | (c & 34816) >> 9;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c;
    z8.r[Regs_F] = (c & 65536 ? 1 : 0) | 2 | oSt[d >> 4] | z8.r[Regs_H] & 168 | hcst_[d & 7] | (z8.r[Regs_L] | z8.r[Regs_H] << 8 ? 0 : 64)
};
z8oT_c237[115] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    wQi(c++, z8.r2[Regs2_SP] & 255);
    wQi(c & 65535, z8.r2[Regs2_SP] >> 8)
};
z8oT_c237[120] = function() {
    tss += 4;
    z8.r[Regs_A] = ti_common_in(z8.r[Regs_C] | z8.r[Regs_B] << 8);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | zTe6[z8.r[Regs_A]]
};
z8oT_c237[121] = function() {
    tss += 4;
    ti_common_out(z8.r[Regs_C] | z8.r[Regs_B] << 8, z8.r[Regs_A])
};
z8oT_c237[122] = function() {
    tss += 7;
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + z8.r2[Regs2_SP] + (z8.r[Regs_F] & 1),
        d = ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 34816) >> 11 | (z8.r2[Regs2_SP] & 34816) >> 10 | (c & 34816) >> 9;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c;
    z8.r[Regs_F] = (c & 65536 ? 1 : 0) | oAt[d >> 4] | z8.r[Regs_H] & 168 | hcat_[d & 7] | (z8.r[Regs_L] | z8.r[Regs_H] << 8 ? 0 : 64)
};
z8oT_c237[123] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8,
        d = wQj(c++),
        c = wQj(c & 65535);
    z8.r2[Regs2_SP] = d | c << 8
};
z8oT_c237[160] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 8;
    var d = (z8.r[Regs_C] | z8.r[Regs_B] << 8) - 1 & 65535;
    z8.r[Regs_B] = d >> 8;
    z8.r[Regs_C] = d;
    wQi(z8.r[Regs_E] | z8.r[Regs_D] << 8, c);
    d = (z8.r[Regs_E] | z8.r[Regs_D] << 8) + 1 & 65535;
    z8.r[Regs_D] = d >> 8;
    z8.r[Regs_E] = d;
    d = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + 1 & 65535;
    z8.r[Regs_H] = d >> 8;
    z8.r[Regs_L] = d;
    c = c + z8.r[Regs_A] & 255;
    z8.r[Regs_F] = z8.r[Regs_F] & 193 | (z8.r[Regs_C] | z8.r[Regs_B] << 8 ? 4 : 0) | c & 8 | (c & 2 ? 32 : 0)
};
z8oT_c237[161] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8),
        d = z8.r[Regs_A] - c & 255,
        c = (z8.r[Regs_A] & 8) >> 3 | (c & 8) >> 2 | (d & 8) >> 1;
    tss += 8;
    var f = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + 1 & 65535;
    z8.r[Regs_H] = f >> 8;
    z8.r[Regs_L] = f;
    f = (z8.r[Regs_C] | z8.r[Regs_B] << 8) - 1 & 65535;
    z8.r[Regs_B] = f >> 8;
    z8.r[Regs_C] = f;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (z8.r[Regs_C] | z8.r[Regs_B] << 8 ? 6 : 2) | hcst_[c] | (d ? 0 : 64) | d & 128;
    z8.r[Regs_F] & 16 && d--;
    z8.r[Regs_F] = z8.r[Regs_F] | d & 8 | (d & 2 ? 32 : 0)
};
z8oT_c237[162] = function() {
    var c = ti_common_in(z8.r[Regs_C] | z8.r[Regs_B] << 8);
    tss += 8;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c);
    --z8.r[Regs_B];
    var d = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + 1 & 65535;
    z8.r[Regs_H] = d >> 8;
    z8.r[Regs_L] = d;
    z8.r[Regs_F] = (c & 128 ? 2 : 0) | zTe5[z8.r[Regs_B]]
};
z8oT_c237[163] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    --z8.r[Regs_B];
    tss += 8;
    var d = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + 1 & 65535;
    z8.r[Regs_H] = d >> 8;
    z8.r[Regs_L] = d;
    ti_common_out(z8.r[Regs_C] | z8.r[Regs_B] << 8, c);
    z8.r[Regs_F] = (c & 128 ? 2 : 0) | zTe5[z8.r[Regs_B]]
};
z8oT_c237[168] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 8;
    var d = (z8.r[Regs_C] | z8.r[Regs_B] << 8) - 1 & 65535;
    z8.r[Regs_B] = d >> 8;
    z8.r[Regs_C] = d;
    wQi(z8.r[Regs_E] | z8.r[Regs_D] << 8, c);
    d = (z8.r[Regs_E] | z8.r[Regs_D] << 8) - 1 & 65535;
    z8.r[Regs_D] = d >> 8;
    z8.r[Regs_E] = d;
    d = (z8.r[Regs_L] | z8.r[Regs_H] << 8) - 1 & 65535;
    z8.r[Regs_H] = d >> 8;
    z8.r[Regs_L] = d;
    c = c + z8.r[Regs_A] & 255;
    z8.r[Regs_F] = z8.r[Regs_F] & 193 | (z8.r[Regs_C] | z8.r[Regs_B] << 8 ? 4 : 0) | c & 8 | (c & 2 ? 32 : 0)
};
z8oT_c237[169] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8),
        d = z8.r[Regs_A] - c & 255,
        c = (z8.r[Regs_A] & 8) >> 3 | (c & 8) >> 2 | (d & 8) >> 1;
    tss += 8;
    var f = (z8.r[Regs_L] | z8.r[Regs_H] << 8) - 1 & 65535;
    z8.r[Regs_H] = f >> 8;
    z8.r[Regs_L] = f;
    f = (z8.r[Regs_C] | z8.r[Regs_B] << 8) - 1 & 65535;
    z8.r[Regs_B] = f >> 8;
    z8.r[Regs_C] = f;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (z8.r[Regs_C] | z8.r[Regs_B] << 8 ? 6 : 2) | hcst_[c] | (d ? 0 : 64) | d & 128;
    z8.r[Regs_F] & 16 && d--;
    z8.r[Regs_F] = z8.r[Regs_F] | d & 8 | (d & 2 ? 32 : 0)
};
z8oT_c237[170] = function() {
    var c = ti_common_in(z8.r[Regs_C] | z8.r[Regs_B] << 8);
    tss += 8;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c);
    --z8.r[Regs_B];
    var d = (z8.r[Regs_L] | z8.r[Regs_H] << 8) - 1 & 65535;
    z8.r[Regs_H] = d >> 8;
    z8.r[Regs_L] = d;
    z8.r[Regs_F] = (c & 128 ? 2 : 0) | zTe5[z8.r[Regs_B]]
};
z8oT_c237[171] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    --z8.r[Regs_B];
    tss++;
    tss += 7;
    var d = (z8.r[Regs_L] | z8.r[Regs_H] << 8) - 1 & 65535;
    z8.r[Regs_H] = d >> 8;
    z8.r[Regs_L] = d;
    ti_common_out(z8.r[Regs_C] | z8.r[Regs_B] << 8, c);
    z8.r[Regs_F] = (c & 128 ? 2 : 0) | zTe5[z8.r[Regs_B]]
};
z8oT_c237[176] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 8;
    wQi(z8.r[Regs_E] | z8.r[Regs_D] << 8, c);
    var d = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + 1 & 65535;
    z8.r[Regs_H] = d >> 8;
    z8.r[Regs_L] = d;
    d = (z8.r[Regs_E] | z8.r[Regs_D] << 8) + 1 & 65535;
    z8.r[Regs_D] = d >> 8;
    z8.r[Regs_E] = d;
    d = (z8.r[Regs_C] | z8.r[Regs_B] << 8) - 1 & 65535;
    z8.r[Regs_B] = d >> 8;
    z8.r[Regs_C] = d;
    c = c + z8.r[Regs_A] & 255;
    z8.r[Regs_F] = z8.r[Regs_F] & 193 | (z8.r[Regs_C] | z8.r[Regs_B] << 8 ? 4 : 0) | c & 8 | (c & 2 ? 32 : 0);
    z8.r[Regs_C] | z8.r[Regs_B] << 8 && (tss += 1, tss += 1, tss += 1, tss += 1, tss += 1, z8.r2[Regs2_PC] -= 2)
};
z8oT_c237[177] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8),
        d = z8.r[Regs_A] - c & 255,
        c = (z8.r[Regs_A] & 8) >> 3 | (c & 8) >> 2 | (d & 8) >> 1;
    tss += 8;
    var f = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + 1 & 65535;
    z8.r[Regs_H] = f >> 8;
    z8.r[Regs_L] = f;
    f = (z8.r[Regs_C] | z8.r[Regs_B] << 8) - 1 & 65535;
    z8.r[Regs_B] = f >> 8;
    z8.r[Regs_C] = f;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (z8.r[Regs_C] | z8.r[Regs_B] << 8 ? 6 : 2) | hcst_[c] | (d ? 0 : 64) | d & 128;
    z8.r[Regs_F] & 16 && d--;
    z8.r[Regs_F] = z8.r[Regs_F] | d & 8 | (d & 2 ? 32 : 0);
    4 == (z8.r[Regs_F] &
        68) && (tss += 1, tss += 1, tss += 1, tss += 1, tss += 1, z8.r2[Regs2_PC] -= 2)
};
z8oT_c237[178] = function() {
    var c = ti_common_in(z8.r[Regs_C] | z8.r[Regs_B] << 8);
    tss += 8;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c);
    --z8.r[Regs_B];
    var d = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + 1 & 65535;
    z8.r[Regs_H] = d >> 8;
    z8.r[Regs_L] = d;
    z8.r[Regs_F] = (c & 128 ? 2 : 0) | zTe5[z8.r[Regs_B]];
    z8.r[Regs_B] && (tss += 1, tss += 1, tss += 1, tss += 1, tss += 1, z8.r2[Regs2_PC] -= 2)
};
z8oT_c237[179] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 5;
    --z8.r[Regs_B];
    var d = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + 1 & 65535;
    z8.r[Regs_H] = d >> 8;
    z8.r[Regs_L] = d;
    ti_common_out(z8.r[Regs_C] | z8.r[Regs_B] << 8, c);
    z8.r[Regs_F] = (c & 128 ? 2 : 0) | zTe5[z8.r[Regs_B]];
    z8.r[Regs_B] ? (tss += 1, tss += 1, tss += 1, tss += 1, tss += 1, tss += 1, tss += 1, tss += 1, z8.r2[Regs2_PC] -= 2) : tss += 3
};
z8oT_c237[184] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 8;
    wQi(z8.r[Regs_E] | z8.r[Regs_D] << 8, c);
    var d = (z8.r[Regs_L] | z8.r[Regs_H] << 8) - 1 & 65535;
    z8.r[Regs_H] = d >> 8;
    z8.r[Regs_L] = d;
    d = (z8.r[Regs_E] | z8.r[Regs_D] << 8) - 1 & 65535;
    z8.r[Regs_D] = d >> 8;
    z8.r[Regs_E] = d;
    d = (z8.r[Regs_C] | z8.r[Regs_B] << 8) - 1 & 65535;
    z8.r[Regs_B] = d >> 8;
    z8.r[Regs_C] = d;
    c = c + z8.r[Regs_A] & 255;
    z8.r[Regs_F] = z8.r[Regs_F] & 193 | (z8.r[Regs_C] | z8.r[Regs_B] << 8 ? 4 : 0) | c & 8 | (c & 2 ? 32 : 0);
    z8.r[Regs_C] | z8.r[Regs_B] << 8 && (tss += 1, tss += 1, tss += 1, tss += 1, tss += 1, z8.r2[Regs2_PC] -= 2)
};
z8oT_c237[185] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8),
        d = z8.r[Regs_A] - c & 255,
        c = (z8.r[Regs_A] & 8) >> 3 | (c & 8) >> 2 | (d & 8) >> 1;
    tss += 5;
    var f = (z8.r[Regs_L] | z8.r[Regs_H] << 8) - 1 & 65535;
    z8.r[Regs_H] = f >> 8;
    z8.r[Regs_L] = f;
    f = (z8.r[Regs_C] | z8.r[Regs_B] << 8) - 1 & 65535;
    z8.r[Regs_B] = f >> 8;
    z8.r[Regs_C] = f;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (z8.r[Regs_C] | z8.r[Regs_B] << 8 ? 6 : 2) | hcst_[c] | (d ? 0 : 64) | d & 128;
    z8.r[Regs_F] & 16 && d--;
    z8.r[Regs_F] = z8.r[Regs_F] | d & 8 | (d & 2 ? 32 : 0);
    4 == (z8.r[Regs_F] &
        68) && (tss += 1, tss += 1, tss += 1, tss += 1, tss += 1, z8.r2[Regs2_PC] -= 2)
};
z8oT_c237[186] = function() {
    var c = ti_common_in(z8.r[Regs_C] | z8.r[Regs_B] << 8);
    tss += 8;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c);
    --z8.r[Regs_B];
    var d = (z8.r[Regs_L] | z8.r[Regs_H] << 8) - 1 & 65535;
    z8.r[Regs_H] = d >> 8;
    z8.r[Regs_L] = d;
    z8.r[Regs_F] = (c & 128 ? 2 : 0) | zTe5[z8.r[Regs_B]];
    z8.r[Regs_B] && (tss += 1, tss += 1, tss += 1, tss += 1, tss += 1, z8.r2[Regs2_PC] -= 2)
};
z8oT_c237[187] = function() {
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    tss += 5;
    --z8.r[Regs_B];
    var d = (z8.r[Regs_L] | z8.r[Regs_H] << 8) - 1 & 65535;
    z8.r[Regs_H] = d >> 8;
    z8.r[Regs_L] = d;
    ti_common_out(z8.r[Regs_C] | z8.r[Regs_B] << 8, c);
    z8.r[Regs_F] = (c & 128 ? 2 : 0) | zTe5[z8.r[Regs_B]];
    z8.r[Regs_B] ? (tss += 8, z8.r2[Regs2_PC] -= 2) : tss += 3
};
z8oT_c237[188] = z8oT_c237[187];
window.z8oT_c253c203 = Array(257);
z8oT_c253c203[0] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    z8.r[Regs_B] = (z8.r[Regs_B] & 127) << 1 | z8.r[Regs_B] >> 7;
    z8.r[Regs_F] = z8.r[Regs_B] & 1 | zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[1] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    z8.r[Regs_C] = (z8.r[Regs_C] & 127) << 1 | z8.r[Regs_C] >> 7;
    z8.r[Regs_F] = z8.r[Regs_C] & 1 | zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[2] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    z8.r[Regs_D] = (z8.r[Regs_D] & 127) << 1 | z8.r[Regs_D] >> 7;
    z8.r[Regs_F] = z8.r[Regs_D] & 1 | zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[3] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    z8.r[Regs_E] = (z8.r[Regs_E] & 127) << 1 | z8.r[Regs_E] >> 7;
    z8.r[Regs_F] = z8.r[Regs_E] & 1 | zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[4] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    z8.r[Regs_H] = (z8.r[Regs_H] & 127) << 1 | z8.r[Regs_H] >> 7;
    z8.r[Regs_F] = z8.r[Regs_H] & 1 | zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[5] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    z8.r[Regs_L] = (z8.r[Regs_L] & 127) << 1 | z8.r[Regs_L] >> 7;
    z8.r[Regs_F] = z8.r[Regs_L] & 1 | zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[6] = function(c) {
    tss += 8;
    var d = wQj(c),
        d = (d & 127) << 1 | d >> 7;
    z8.r[Regs_F] = d & 1 | zTe6[d];
    wQi(c, d)
};
z8oT_c253c203[7] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    z8.r[Regs_A] = (z8.r[Regs_A] & 127) << 1 | z8.r[Regs_A] >> 7;
    z8.r[Regs_F] = z8.r[Regs_A] & 1 | zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[8] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_B] & 1;
    z8.r[Regs_B] = z8.r[Regs_B] >> 1 | (z8.r[Regs_B] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[9] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_C] & 1;
    z8.r[Regs_C] = z8.r[Regs_C] >> 1 | (z8.r[Regs_C] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[10] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_D] & 1;
    z8.r[Regs_D] = z8.r[Regs_D] >> 1 | (z8.r[Regs_D] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[11] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_E] & 1;
    z8.r[Regs_E] = z8.r[Regs_E] >> 1 | (z8.r[Regs_E] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[12] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_H] & 1;
    z8.r[Regs_H] = z8.r[Regs_H] >> 1 | (z8.r[Regs_H] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[13] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_L] & 1;
    z8.r[Regs_L] = z8.r[Regs_L] >> 1 | (z8.r[Regs_L] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[14] = function(c) {
    tss += 8;
    var d = wQj(c);
    z8.r[Regs_F] = d & 1;
    d = d >> 1 | (d & 1) << 7;
    z8.r[Regs_F] |= zTe6[d];
    wQi(c, d)
};
z8oT_c253c203[15] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_A] & 1;
    z8.r[Regs_A] = z8.r[Regs_A] >> 1 | (z8.r[Regs_A] & 1) << 7;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[16] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    var d = z8.r[Regs_B];
    z8.r[Regs_B] = (z8.r[Regs_B] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[17] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    var d = z8.r[Regs_C];
    z8.r[Regs_C] = (z8.r[Regs_C] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[18] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    var d = z8.r[Regs_D];
    z8.r[Regs_D] = (z8.r[Regs_D] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[19] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    var d = z8.r[Regs_E];
    z8.r[Regs_E] = (z8.r[Regs_E] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[20] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    var d = z8.r[Regs_H];
    z8.r[Regs_H] = (z8.r[Regs_H] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[21] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    var d = z8.r[Regs_L];
    z8.r[Regs_L] = (z8.r[Regs_L] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[22] = function(c) {
    tss += 8;
    var d = wQj(c),
        f = (d & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[f];
    wQi(c, f)
};
z8oT_c253c203[23] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    var d = z8.r[Regs_A];
    z8.r[Regs_A] = (z8.r[Regs_A] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = d >> 7 | zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[24] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    var d = z8.r[Regs_B];
    z8.r[Regs_B] = z8.r[Regs_B] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[25] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    var d = z8.r[Regs_C];
    z8.r[Regs_C] = z8.r[Regs_C] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[26] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    var d = z8.r[Regs_D];
    z8.r[Regs_D] = z8.r[Regs_D] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[27] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    var d = z8.r[Regs_E];
    z8.r[Regs_E] = z8.r[Regs_E] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[28] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    var d = z8.r[Regs_H];
    z8.r[Regs_H] = z8.r[Regs_H] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[29] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    var d = z8.r[Regs_L];
    z8.r[Regs_L] = z8.r[Regs_L] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[30] = function(c) {
    tss += 8;
    var d = wQj(c),
        f = d >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[f];
    wQi(c, f)
};
z8oT_c253c203[31] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    var d = z8.r[Regs_A];
    z8.r[Regs_A] = z8.r[Regs_A] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = d & 1 | zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[32] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_B] >> 7;
    z8.r[Regs_B] <<= 1;
    z8.r[Regs_B] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[33] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_C] >> 7;
    z8.r[Regs_C] <<= 1;
    z8.r[Regs_C] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[34] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_D] >> 7;
    z8.r[Regs_D] <<= 1;
    z8.r[Regs_D] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[35] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_E] >> 7;
    z8.r[Regs_E] <<= 1;
    z8.r[Regs_E] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[36] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_H] >> 7;
    z8.r[Regs_H] <<= 1;
    z8.r[Regs_H] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[37] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_L] >> 7;
    z8.r[Regs_L] <<= 1;
    z8.r[Regs_L] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[38] = function(c) {
    tss += 8;
    var d = wQj(c);
    z8.r[Regs_F] = d >> 7;
    d = d << 1 & 255;
    z8.r[Regs_F] |= zTe6[d];
    wQi(c, d)
};
z8oT_c253c203[39] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_A] >> 7;
    z8.r[Regs_A] <<= 1;
    z8.r[Regs_A] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[40] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_B] & 1;
    z8.r[Regs_B] = z8.r[Regs_B] & 128 | z8.r[Regs_B] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[41] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_C] & 1;
    z8.r[Regs_C] = z8.r[Regs_C] & 128 | z8.r[Regs_C] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[42] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_D] & 1;
    z8.r[Regs_D] = z8.r[Regs_D] & 128 | z8.r[Regs_D] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[43] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_E] & 1;
    z8.r[Regs_E] = z8.r[Regs_E] & 128 | z8.r[Regs_E] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[44] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_H] & 1;
    z8.r[Regs_H] = z8.r[Regs_H] & 128 | z8.r[Regs_H] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[45] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_L] & 1;
    z8.r[Regs_L] = z8.r[Regs_L] & 128 | z8.r[Regs_L] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[46] = function(c) {
    tss += 8;
    var d = wQj(c);
    z8.r[Regs_F] = d & 1;
    d = d & 128 | d >> 1;
    z8.r[Regs_F] |= zTe6[d];
    wQi(c, d)
};
z8oT_c253c203[47] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_A] & 1;
    z8.r[Regs_A] = z8.r[Regs_A] & 128 | z8.r[Regs_A] >> 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[48] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_B] >> 7;
    z8.r[Regs_B] = z8.r[Regs_B] << 1 | 1;
    z8.r[Regs_B] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[49] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_C] >> 7;
    z8.r[Regs_C] = z8.r[Regs_C] << 1 | 1;
    z8.r[Regs_C] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[50] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_D] >> 7;
    z8.r[Regs_D] = z8.r[Regs_D] << 1 | 1;
    z8.r[Regs_D] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[51] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_E] >> 7;
    z8.r[Regs_E] = z8.r[Regs_E] << 1 | 1;
    z8.r[Regs_E] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[52] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_H] >> 7;
    z8.r[Regs_H] = z8.r[Regs_H] << 1 | 1;
    z8.r[Regs_H] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[53] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_L] >> 7;
    z8.r[Regs_L] = z8.r[Regs_L] << 1 | 1;
    z8.r[Regs_L] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[54] = function(c) {
    tss += 8;
    var d = wQj(c);
    z8.r[Regs_F] = d >> 7;
    d = (d << 1 | 1) & 255;
    z8.r[Regs_F] |= zTe6[d];
    wQi(c, d)
};
z8oT_c253c203[55] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_A] >> 7;
    z8.r[Regs_A] = z8.r[Regs_A] << 1 | 1;
    z8.r[Regs_A] &= 255;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[56] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_B] & 1;
    z8.r[Regs_B] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_B]];
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[57] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_C] & 1;
    z8.r[Regs_C] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_C]];
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[58] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_D] & 1;
    z8.r[Regs_D] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_D]];
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[59] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_E] & 1;
    z8.r[Regs_E] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_E]];
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[60] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_H] & 1;
    z8.r[Regs_H] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_H]];
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[61] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_L] & 1;
    z8.r[Regs_L] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_L]];
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[62] = function(c) {
    tss += 8;
    var d = wQj(c);
    z8.r[Regs_F] = d & 1;
    d >>= 1;
    z8.r[Regs_F] |= zTe6[d];
    wQi(c, d)
};
z8oT_c253c203[63] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_A] & 1;
    z8.r[Regs_A] >>= 1;
    z8.r[Regs_F] |= zTe6[z8.r[Regs_A]];
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[71] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 1 || (z8.r[Regs_F] |= 68)
};
z8oT_c253c203[64] = z8oT_c253c203[71];
z8oT_c253c203[65] = z8oT_c253c203[71];
z8oT_c253c203[66] = z8oT_c253c203[71];
z8oT_c253c203[67] = z8oT_c253c203[71];
z8oT_c253c203[68] = z8oT_c253c203[71];
z8oT_c253c203[69] = z8oT_c253c203[71];
z8oT_c253c203[70] = z8oT_c253c203[71];
z8oT_c253c203[79] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 2 || (z8.r[Regs_F] |= 68)
};
z8oT_c253c203[72] = z8oT_c253c203[79];
z8oT_c253c203[73] = z8oT_c253c203[79];
z8oT_c253c203[74] = z8oT_c253c203[79];
z8oT_c253c203[75] = z8oT_c253c203[79];
z8oT_c253c203[76] = z8oT_c253c203[79];
z8oT_c253c203[77] = z8oT_c253c203[79];
z8oT_c253c203[78] = z8oT_c253c203[79];
z8oT_c253c203[87] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 4 || (z8.r[Regs_F] |= 68)
};
z8oT_c253c203[80] = z8oT_c253c203[87];
z8oT_c253c203[81] = z8oT_c253c203[87];
z8oT_c253c203[82] = z8oT_c253c203[87];
z8oT_c253c203[83] = z8oT_c253c203[87];
z8oT_c253c203[84] = z8oT_c253c203[87];
z8oT_c253c203[85] = z8oT_c253c203[87];
z8oT_c253c203[86] = z8oT_c253c203[87];
z8oT_c253c203[95] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 8 || (z8.r[Regs_F] |= 68)
};
z8oT_c253c203[88] = z8oT_c253c203[95];
z8oT_c253c203[89] = z8oT_c253c203[95];
z8oT_c253c203[90] = z8oT_c253c203[95];
z8oT_c253c203[91] = z8oT_c253c203[95];
z8oT_c253c203[92] = z8oT_c253c203[95];
z8oT_c253c203[93] = z8oT_c253c203[95];
z8oT_c253c203[94] = z8oT_c253c203[95];
z8oT_c253c203[103] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 16 || (z8.r[Regs_F] |= 68)
};
z8oT_c253c203[96] = z8oT_c253c203[103];
z8oT_c253c203[97] = z8oT_c253c203[103];
z8oT_c253c203[98] = z8oT_c253c203[103];
z8oT_c253c203[99] = z8oT_c253c203[103];
z8oT_c253c203[100] = z8oT_c253c203[103];
z8oT_c253c203[101] = z8oT_c253c203[103];
z8oT_c253c203[102] = z8oT_c253c203[103];
z8oT_c253c203[111] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 32 || (z8.r[Regs_F] |= 68)
};
z8oT_c253c203[104] = z8oT_c253c203[111];
z8oT_c253c203[105] = z8oT_c253c203[111];
z8oT_c253c203[106] = z8oT_c253c203[111];
z8oT_c253c203[107] = z8oT_c253c203[111];
z8oT_c253c203[108] = z8oT_c253c203[111];
z8oT_c253c203[109] = z8oT_c253c203[111];
z8oT_c253c203[110] = z8oT_c253c203[111];
z8oT_c253c203[119] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 64 || (z8.r[Regs_F] |= 68)
};
z8oT_c253c203[112] = z8oT_c253c203[119];
z8oT_c253c203[113] = z8oT_c253c203[119];
z8oT_c253c203[114] = z8oT_c253c203[119];
z8oT_c253c203[115] = z8oT_c253c203[119];
z8oT_c253c203[116] = z8oT_c253c203[119];
z8oT_c253c203[117] = z8oT_c253c203[119];
z8oT_c253c203[118] = z8oT_c253c203[119];
z8oT_c253c203[127] = function(c) {
    tss += 5;
    var d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | 16 | c >> 8 & 40;
    d & 128 || (z8.r[Regs_F] |= 68);
    d & 128 && (z8.r[Regs_F] |= 128)
};
z8oT_c253c203[120] = z8oT_c253c203[127];
z8oT_c253c203[121] = z8oT_c253c203[127];
z8oT_c253c203[122] = z8oT_c253c203[127];
z8oT_c253c203[123] = z8oT_c253c203[127];
z8oT_c253c203[124] = z8oT_c253c203[127];
z8oT_c253c203[125] = z8oT_c253c203[127];
z8oT_c253c203[126] = z8oT_c253c203[127];
z8oT_c253c203[128] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 254;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[129] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 254;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[130] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 254;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[131] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 254;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[132] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 254;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[133] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 254;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[134] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 254)
};
z8oT_c253c203[135] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 254;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[136] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 253;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[137] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 253;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[138] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 253;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[139] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 253;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[140] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 253;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[141] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 253;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[142] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 253)
};
z8oT_c253c203[143] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 253;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[144] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 251;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[145] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 251;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[146] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 251;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[147] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 251;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[148] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 251;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[149] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 251;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[150] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 251)
};
z8oT_c253c203[151] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 251;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[152] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 247;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[153] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 247;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[154] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 247;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[155] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 247;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[156] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 247;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[157] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 247;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[158] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 247)
};
z8oT_c253c203[159] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 247;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[160] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 239;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[161] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 239;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[162] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 239;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[163] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 239;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[164] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 239;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[165] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 239;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[166] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 239)
};
z8oT_c253c203[167] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 239;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[168] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 223;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[169] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 223;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[170] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 223;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[171] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 223;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[172] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 223;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[173] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 223;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[174] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 223)
};
z8oT_c253c203[175] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 223;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[176] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 191;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[177] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 191;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[178] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 191;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[179] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 191;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[180] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 191;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[181] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 191;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[182] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 191)
};
z8oT_c253c203[183] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 191;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[184] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) & 127;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[185] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) & 127;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[186] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) & 127;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[187] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) & 127;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[188] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) & 127;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[189] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) & 127;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[190] = function(c) {
    tss += 8;
    wQi(c, wQj(c) & 127)
};
z8oT_c253c203[191] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) & 127;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[192] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 1;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[193] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 1;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[194] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 1;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[195] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 1;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[196] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 1;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[197] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 1;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[198] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 1)
};
z8oT_c253c203[199] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 1;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[200] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 2;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[201] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 2;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[202] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 2;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[203] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 2;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[204] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 2;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[205] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 2;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[206] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 2)
};
z8oT_c253c203[207] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 2;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[208] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 4;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[209] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 4;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[210] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 4;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[211] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 4;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[212] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 4;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[213] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 4;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[214] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 4)
};
z8oT_c253c203[215] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 4;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[216] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 8;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[217] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 8;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[218] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 8;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[219] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 8;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[220] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 8;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[221] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 8;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[222] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 8)
};
z8oT_c253c203[223] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 8;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[224] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 16;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[225] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 16;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[226] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 16;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[227] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 16;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[228] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 16;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[229] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 16;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[230] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 16)
};
z8oT_c253c203[231] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 16;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[232] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 32;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[233] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 32;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[234] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 32;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[235] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 32;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[236] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 32;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[237] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 32;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[238] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 32)
};
z8oT_c253c203[239] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 32;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[240] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 64;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[241] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 64;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[242] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 64;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[243] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 64;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[244] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 64;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[245] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 64;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[246] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 64)
};
z8oT_c253c203[247] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 64;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[248] = function(c) {
    tss += 8;
    z8.r[Regs_B] = wQj(c) | 128;
    wQi(c, z8.r[Regs_B])
};
z8oT_c253c203[249] = function(c) {
    tss += 8;
    z8.r[Regs_C] = wQj(c) | 128;
    wQi(c, z8.r[Regs_C])
};
z8oT_c253c203[250] = function(c) {
    tss += 8;
    z8.r[Regs_D] = wQj(c) | 128;
    wQi(c, z8.r[Regs_D])
};
z8oT_c253c203[251] = function(c) {
    tss += 8;
    z8.r[Regs_E] = wQj(c) | 128;
    wQi(c, z8.r[Regs_E])
};
z8oT_c253c203[252] = function(c) {
    tss += 8;
    z8.r[Regs_H] = wQj(c) | 128;
    wQi(c, z8.r[Regs_H])
};
z8oT_c253c203[253] = function(c) {
    tss += 8;
    z8.r[Regs_L] = wQj(c) | 128;
    wQi(c, z8.r[Regs_L])
};
z8oT_c253c203[254] = function(c) {
    tss += 8;
    wQi(c, wQj(c) | 128)
};
z8oT_c253c203[255] = function(c) {
    tss += 8;
    z8.r[Regs_A] = wQj(c) | 128;
    wQi(c, z8.r[Regs_A])
};
z8oT_c253c203[256] = z8oT_c253c203[255];
window.z8oT_c253 = Array(251);
z8oT_c253[9] = function() {
    var c = (z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + (z8.r[Regs_C] | z8.r[Regs_B] << 8),
        d = ((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) & 2048) >> 11 | ((z8.r[Regs_C] | z8.r[Regs_B] << 8) & 2048) >> 10 | (c & 2048) >> 9;
    tss += 7;
    z8.r[Regs_IYH] = c >> 8;
    z8.r[Regs_IYL] = c;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | (c & 65536 ? 1 : 0) | c >> 8 & 40 | hcat_[d]
};
z8oT_c253[25] = function() {
    var c = (z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + (z8.r[Regs_E] | z8.r[Regs_D] << 8),
        d = ((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) & 2048) >> 11 | ((z8.r[Regs_E] | z8.r[Regs_D] << 8) & 2048) >> 10 | (c & 2048) >> 9;
    tss += 7;
    z8.r[Regs_IYH] = c >> 8;
    z8.r[Regs_IYL] = c;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | (c & 65536 ? 1 : 0) | c >> 8 & 40 | hcat_[d]
};
z8oT_c253[33] = function() {
    tss += 6;
    z8.r[Regs_IYL] = wQj(z8.r2[Regs2_PC]++);
    z8.r[Regs_IYH] = wQj(z8.r2[Regs2_PC]++)
};
z8oT_c253[34] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    wQi(c++, z8.r[Regs_IYL]);
    wQi(c & 65535, z8.r[Regs_IYH])
};
z8oT_c253[35] = function() {
    tss += 2;
    var c = (z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + 1 & 65535;
    z8.r[Regs_IYH] = c >> 8;
    z8.r[Regs_IYL] = c
};
z8oT_c253[36] = function() {
    z8.r[Regs_IYH] += 1;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (128 == z8.r[Regs_IYH] ? 4 : 0) | (z8.r[Regs_IYH] & 15 ? 0 : 16) | zTe5[z8.r[Regs_IYH]]
};
z8oT_c253[37] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (z8.r[Regs_IYH] & 15 ? 0 : 16) | 2;
    --z8.r[Regs_IYH];
    z8.r[Regs_F] = z8.r[Regs_F] | (127 == z8.r[Regs_IYH] ? 4 : 0) | zTe5[z8.r[Regs_IYH]]
};
z8oT_c253[38] = function() {
    tss += 3;
    z8.r[Regs_IYH] = wQj(z8.r2[Regs2_PC]++)
};
z8oT_c253[41] = function() {
    var c = (z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + (z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8),
        d = ((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) & 2048) >> 11 | ((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) & 2048) >> 10 | (c & 2048) >> 9;
    tss += 7;
    z8.r[Regs_IYH] = c >> 8;
    z8.r[Regs_IYL] = c;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | (c & 65536 ? 1 : 0) | c >> 8 & 40 | hcat_[d]
};
z8oT_c253[42] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    z8.r[Regs_IYL] = wQj(c++);
    z8.r[Regs_IYH] = wQj(c & 65535)
};
z8oT_c253[43] = function() {
    tss += 2;
    var c = (z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) - 1 & 65535;
    z8.r[Regs_IYH] = c >> 8;
    z8.r[Regs_IYL] = c
};
z8oT_c253[44] = function() {
    z8.r[Regs_IYL] += 1;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (128 == z8.r[Regs_IYL] ? 4 : 0) | (z8.r[Regs_IYL] & 15 ? 0 : 16) | zTe5[z8.r[Regs_IYL]]
};
z8oT_c253[45] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (z8.r[Regs_IYL] & 15 ? 0 : 16) | 2;
    --z8.r[Regs_IYL];
    z8.r[Regs_F] = z8.r[Regs_F] | (127 == z8.r[Regs_IYL] ? 4 : 0) | zTe5[z8.r[Regs_IYL]]
};
z8oT_c253[46] = function() {
    tss += 3;
    z8.r[Regs_IYL] = wQj(z8.r2[Regs2_PC]++)
};
z8oT_c253[52] = function() {
    tss += 15;
    var c = (z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535,
        d = wQj(c),
        d = d + 1 & 255;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (128 == d ? 4 : 0) | (d & 15 ? 0 : 16) | zTe5[d];
    wQi(c, d)
};
z8oT_c253[53] = function() {
    tss += 15;
    var c = (z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535,
        d = wQj(c);
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | (d & 15 ? 0 : 16) | 2;
    d = d - 1 & 255;
    z8.r[Regs_F] = z8.r[Regs_F] | (127 == d ? 4 : 0) | zTe5[d];
    wQi(c, d)
};
z8oT_c253[54] = function() {
    tss += 11;
    var c = (z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535;
    wQi(c, wQj(z8.r2[Regs2_PC]++))
};
z8oT_c253[57] = function() {
    var c = (z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + z8.r2[Regs2_SP],
        d = ((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) & 2048) >> 11 | (z8.r2[Regs2_SP] & 2048) >> 10 | (c & 2048) >> 9;
    tss += 7;
    z8.r[Regs_IYH] = c >> 8;
    z8.r[Regs_IYL] = c;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | (c & 65536 ? 1 : 0) | c >> 8 & 40 | hcat_[d]
};
z8oT_c253[68] = function() {
    z8.r[Regs_B] = z8.r[Regs_IYH]
};
z8oT_c253[69] = function() {
    z8.r[Regs_B] = z8.r[Regs_IYL]
};
z8oT_c253[70] = function() {
    tss += 11;
    z8.r[Regs_B] = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c253[76] = function() {
    z8.r[Regs_C] = z8.r[Regs_IYH]
};
z8oT_c253[77] = function() {
    z8.r[Regs_C] = z8.r[Regs_IYL]
};
z8oT_c253[78] = function() {
    tss += 11;
    z8.r[Regs_C] = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c253[84] = function() {
    z8.r[Regs_D] = z8.r[Regs_IYH]
};
z8oT_c253[85] = function() {
    z8.r[Regs_D] = z8.r[Regs_IYL]
};
z8oT_c253[86] = function() {
    tss += 11;
    z8.r[Regs_D] = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c253[92] = function() {
    z8.r[Regs_E] = z8.r[Regs_IYH]
};
z8oT_c253[93] = function() {
    z8.r[Regs_E] = z8.r[Regs_IYL]
};
z8oT_c253[94] = function() {
    tss += 11;
    z8.r[Regs_E] = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c253[96] = function() {
    z8.r[Regs_IYH] = z8.r[Regs_B]
};
z8oT_c253[97] = function() {
    z8.r[Regs_IYH] = z8.r[Regs_C]
};
z8oT_c253[98] = function() {
    z8.r[Regs_IYH] = z8.r[Regs_D]
};
z8oT_c253[99] = function() {
    z8.r[Regs_IYH] = z8.r[Regs_E]
};
z8oT_c253[101] = function() {
    z8.r[Regs_IYH] = z8.r[Regs_IYL]
};
z8oT_c253[100] = z8oT_c253[101];
z8oT_c253[102] = function() {
    tss += 11;
    z8.r[Regs_H] = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c253[103] = function() {
    z8.r[Regs_IYH] = z8.r[Regs_A]
};
z8oT_c253[104] = function() {
    z8.r[Regs_IYL] = z8.r[Regs_B]
};
z8oT_c253[105] = function() {
    z8.r[Regs_IYL] = z8.r[Regs_C]
};
z8oT_c253[106] = function() {
    z8.r[Regs_IYL] = z8.r[Regs_D]
};
z8oT_c253[107] = function() {
    z8.r[Regs_IYL] = z8.r[Regs_E]
};
z8oT_c253[108] = function() {
    z8.r[Regs_IYL] = z8.r[Regs_IYH]
};
z8oT_c253[110] = function() {
    tss += 11;
    z8.r[Regs_L] = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c253[109] = z8oT_c253[110];
z8oT_c253[111] = function() {
    z8.r[Regs_IYL] = z8.r[Regs_A]
};
z8oT_c253[112] = function() {
    tss += 11;
    wQi((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_B])
};
z8oT_c253[113] = function() {
    tss += 11;
    wQi((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_C])
};
z8oT_c253[114] = function() {
    tss += 11;
    wQi((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_D])
};
z8oT_c253[115] = function() {
    tss += 11;
    wQi((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_E])
};
z8oT_c253[116] = function() {
    tss += 11;
    wQi((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_H])
};
z8oT_c253[117] = function() {
    tss += 11;
    wQi((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_L])
};
z8oT_c253[119] = function() {
    tss += 11;
    wQi((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535, z8.r[Regs_A])
};
z8oT_c253[124] = function() {
    z8.r[Regs_A] = z8.r[Regs_IYH]
};
z8oT_c253[125] = function() {
    z8.r[Regs_A] = z8.r[Regs_IYL]
};
z8oT_c253[126] = function() {
    tss += 11;
    z8.r[Regs_A] = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535)
};
z8oT_c253[132] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_IYH],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IYH] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c253[133] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_IYL],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IYL] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c253[134] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535),
        d = z8.r[Regs_A] + c,
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | hcat_[c & 7] | oAt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c253[140] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_IYH] + (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IYH] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c253[141] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_IYL] + (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IYL] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c253[142] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535),
        d = z8.r[Regs_A] + c + (z8.r[Regs_F] & 1),
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | hcat_[c & 7] | oAt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c253[148] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_IYH],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IYH] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c253[149] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_IYL],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IYL] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c253[150] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535),
        d = z8.r[Regs_A] - c,
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | 2 | hcst_[c & 7] | oSt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c253[156] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_IYH] - (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IYH] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c253[157] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_IYL] - (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IYL] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c253[158] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535),
        d = z8.r[Regs_A] - c - (z8.r[Regs_F] & 1),
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | 2 | hcst_[c & 7] | oSt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT_c253[164] = function() {
    z8.r[Regs_A] &= z8.r[Regs_IYH];
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT_c253[165] = function() {
    z8.r[Regs_A] &= z8.r[Regs_IYL];
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT_c253[166] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535);
    z8.r[Regs_A] &= c;
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT_c253[172] = function() {
    z8.r[Regs_A] ^= z8.r[Regs_IYH];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT_c253[173] = function() {
    z8.r[Regs_A] ^= z8.r[Regs_IYL];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT_c253[174] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535);
    z8.r[Regs_A] ^= c;
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT_c253[180] = function() {
    z8.r[Regs_A] |= z8.r[Regs_IYH];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT_c253[181] = function() {
    z8.r[Regs_A] |= z8.r[Regs_IYL];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT_c253[182] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535);
    z8.r[Regs_A] |= c;
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT_c253[188] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_IYH],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IYH] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_F] = (c & 256 ? 1 : c ? 0 : 64) | 2 | hcst_[d & 7] | oSt[d >> 4] | z8.r[Regs_IYH] & 40 | c & 128
};
z8oT_c253[189] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_IYL],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_IYL] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_F] = (c & 256 ? 1 : c ? 0 : 64) | 2 | hcst_[d & 7] | oSt[d >> 4] | z8.r[Regs_IYL] & 40 | c & 128
};
z8oT_c253[190] = function() {
    tss += 11;
    var c = wQj((z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)) & 65535),
        d = z8.r[Regs_A] - c,
        f = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_F] = (d & 256 ? 1 : d ? 0 : 64) | 2 | hcst_[f & 7] | oSt[f >> 4] | c & 40 | d & 128
};
z8oT_c253[203] = function() {
    tss += 7;
    var c = (z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8) + sXd(wQj(z8.r2[Regs2_PC]++)),
        d = wQj(z8.r2[Regs2_PC]++);
    (d = z8oT_c253c203[d]) || (d = z8oT_c253c203[z8oT_c253c203.length - 1]);
    d(c)
};
z8oT_c253[225] = function() {
    tss += 6;
    z8.r[Regs_IYL] = wQj(z8.r2[Regs2_SP]++);
    z8.r[Regs_IYH] = wQj(z8.r2[Regs2_SP]++)
};
z8oT_c253[227] = function() {
    var c = wQj(z8.r2[Regs2_SP]),
        d = wQj(z8.r2[Regs2_SP] + 1);
    tss += 15;
    wQi(z8.r2[Regs2_SP] + 1, z8.r[Regs_IYH]);
    wQi(z8.r2[Regs2_SP], z8.r[Regs_IYL]);
    z8.r[Regs_IYL] = c;
    z8.r[Regs_IYH] = d
};
z8oT_c253[229] = function() {
    tss += 7;
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r[Regs_IYH]);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r[Regs_IYL])
};
z8oT_c253[233] = function() {
    z8.r2[Regs2_PC] = z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8
};
z8oT_c253[249] = function() {
    tss += 2;
    z8.r2[Regs2_SP] = z8.r[Regs_IYL] | z8.r[Regs_IYH] << 8
};
z8oT_c253[250] = function() {
    z8.r2[Regs2_PC]--;
    z8.r[Regs_R]--;
    z8.r[Regs_R] &= 127
};
window.z8oT = Array(257);
z8oT[0] = function() {};
z8oT[1] = function() {
    tss += 6;
    z8.r[Regs_C] = wQj(z8.r2[Regs2_PC]++);
    z8.r[Regs_B] = wQj(z8.r2[Regs2_PC]++)
};
z8oT[2] = function() {
    tss += 3;
    wQi(z8.r[Regs_C] | z8.r[Regs_B] << 8, z8.r[Regs_A])
};
z8oT[3] = function() {
    tss += 2;
    var c = (z8.r[Regs_C] | z8.r[Regs_B] << 8) + 1 & 65535;
    z8.r[Regs_B] = c >> 8;
    z8.r[Regs_C] = c
};
z8oT[4] = function() {
    z8.r[Regs_B] += 1;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfi_table[z8.r[Regs_B]]
};
z8oT[5] = function() {
    --z8.r[Regs_B];
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfd_table[z8.r[Regs_B]]
};
z8oT[6] = function() {
    tss += 3;
    z8.r[Regs_B] = wQj(z8.r2[Regs2_PC]++)
};
z8oT[7] = function() {
    z8.r[Regs_A] = (z8.r[Regs_A] & 127) << 1 | z8.r[Regs_A] >> 7;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | z8.r[Regs_A] & 41
};
z8oT[8] = function() {
    var c = z8.r[Regs_A],
        d = z8.r[Regs_F];
    z8.r[Regs_A] = z8.r[Regs_A_];
    z8.r[Regs_F] = z8.r[Regs_F_];
    z8.r[Regs_A_] = c;
    z8.r[Regs_F_] = d
};
z8oT[9] = function() {
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + (z8.r[Regs_C] | z8.r[Regs_B] << 8),
        d = ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 2048) >> 11 | ((z8.r[Regs_C] | z8.r[Regs_B] << 8) & 2048) >> 10 | (c & 2048) >> 9;
    tss += 7;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | (c & 65536 ? 1 : 0) | c >> 8 & 40 | hcat_[d]
};
z8oT[10] = function() {
    tss += 3;
    z8.r[Regs_A] = wQj(z8.r[Regs_C] | z8.r[Regs_B] << 8)
};
z8oT[11] = function() {
    tss += 2;
    var c = (z8.r[Regs_C] | z8.r[Regs_B] << 8) - 1 & 65535;
    z8.r[Regs_B] = c >> 8;
    z8.r[Regs_C] = c
};
z8oT[12] = function() {
    z8.r[Regs_C] += 1;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfi_table[z8.r[Regs_C]]
};
z8oT[13] = function() {
    --z8.r[Regs_C];
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfd_table[z8.r[Regs_C]]
};
z8oT[14] = function() {
    tss += 3;
    z8.r[Regs_C] = wQj(z8.r2[Regs2_PC]++)
};
z8oT[15] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | z8.r[Regs_A] & 1;
    z8.r[Regs_A] = z8.r[Regs_A] >> 1 | (z8.r[Regs_A] & 1) << 7;
    z8.r[Regs_F] |= z8.r[Regs_A] & 40
};
z8oT[16] = function() {
    tss += 4;
    --z8.r[Regs_B];
    z8.r[Regs_B] && (tss += 1, tss += 1, tss += 1, tss += 1, tss += 1, z8.r2[Regs2_PC] += sXd(wQj(z8.r2[Regs2_PC])));
    z8.r2[Regs2_PC]++
};
z8oT[17] = function() {
    tss += 6;
    z8.r[Regs_E] = wQj(z8.r2[Regs2_PC]++);
    z8.r[Regs_D] = wQj(z8.r2[Regs2_PC]++)
};
z8oT[18] = function() {
    tss += 3;
    wQi(z8.r[Regs_E] | z8.r[Regs_D] << 8, z8.r[Regs_A])
};
z8oT[19] = function() {
    tss += 2;
    var c = (z8.r[Regs_E] | z8.r[Regs_D] << 8) + 1 & 65535;
    z8.r[Regs_D] = c >> 8;
    z8.r[Regs_E] = c
};
z8oT[20] = function() {
    z8.r[Regs_D] += 1;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfi_table[z8.r[Regs_D]]
};
z8oT[21] = function() {
    --z8.r[Regs_D];
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfd_table[z8.r[Regs_D]]
};
z8oT[22] = function() {
    tss += 3;
    z8.r[Regs_D] = wQj(z8.r2[Regs2_PC]++)
};
z8oT[23] = function() {
    var c = z8.r[Regs_A];
    z8.r[Regs_A] = (z8.r[Regs_A] & 127) << 1 | z8.r[Regs_F] & 1;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | z8.r[Regs_A] & 40 | c >> 7
};
z8oT[24] = function() {
    tss += 8;
    z8.r2[Regs2_PC] += sXd(wQj(z8.r2[Regs2_PC]));
    z8.r2[Regs2_PC]++
};
z8oT[25] = function() {
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + (z8.r[Regs_E] | z8.r[Regs_D] << 8),
        d = ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 2048) >> 11 | ((z8.r[Regs_E] | z8.r[Regs_D] << 8) & 2048) >> 10 | (c & 2048) >> 9;
    tss += 7;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | (c & 65536 ? 1 : 0) | c >> 8 & 40 | hcat_[d]
};
z8oT[26] = function() {
    tss += 3;
    z8.r[Regs_A] = wQj(z8.r[Regs_E] | z8.r[Regs_D] << 8)
};
z8oT[27] = function() {
    tss += 2;
    var c = (z8.r[Regs_E] | z8.r[Regs_D] << 8) - 1 & 65535;
    z8.r[Regs_D] = c >> 8;
    z8.r[Regs_E] = c
};
z8oT[28] = function() {
    z8.r[Regs_E] += 1;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfi_table[z8.r[Regs_E]]
};
z8oT[29] = function() {
    --z8.r[Regs_E];
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfd_table[z8.r[Regs_E]]
};
z8oT[30] = function() {
    tss += 3;
    z8.r[Regs_E] = wQj(z8.r2[Regs2_PC]++)
};
z8oT[31] = function() {
    var c = z8.r[Regs_A];
    z8.r[Regs_A] = z8.r[Regs_A] >> 1 | (z8.r[Regs_F] & 1) << 7;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | z8.r[Regs_A] & 40 | c & 1
};
z8oT[32] = function() {
    tss += 3;
    z8.r[Regs_F] & 64 || (tss += 5, z8.r2[Regs2_PC] += sXd(wQj(z8.r2[Regs2_PC])));
    z8.r2[Regs2_PC]++
};
z8oT[33] = function() {
    tss += 6;
    z8.r[Regs_L] = wQj(z8.r2[Regs2_PC]++);
    z8.r[Regs_H] = wQj(z8.r2[Regs2_PC]++)
};
z8oT[34] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    wQi(c++, z8.r[Regs_L]);
    wQi(c & 65535, z8.r[Regs_H])
};
z8oT[35] = function() {
    tss += 2;
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + 1 & 65535;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c
};
z8oT[36] = function() {
    z8.r[Regs_H] += 1;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfi_table[z8.r[Regs_H]]
};
z8oT[37] = function() {
    --z8.r[Regs_H];
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfd_table[z8.r[Regs_H]]
};
z8oT[38] = function() {
    tss += 3;
    z8.r[Regs_H] = wQj(z8.r2[Regs2_PC]++)
};
z8oT[39] = function() {
    var c = 0,
        d = z8.r[Regs_F] & 1;
    if (z8.r[Regs_F] & 16 || 9 < (z8.r[Regs_A] & 15)) c = 6;
    if (d || 153 < z8.r[Regs_A]) c |= 96;
    153 < z8.r[Regs_A] && (d = 1);
    if (z8.r[Regs_F] & 2) {
        var f = z8.r[Regs_A] - c,
            c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (f & 136) >> 1;
        z8.r[Regs_A] = f;
        z8.r[Regs_F] = (f & 256 ? 1 : 0) | 2 | hcst_[c & 7] | oSt[c >> 4] | zTe5[z8.r[Regs_A]]
    } else f = z8.r[Regs_A] + c, c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (f & 136) >> 1, z8.r[Regs_A] = f, z8.r[Regs_F] = (f & 256 ? 1 : 0) | hcat_[c & 7] | oAt[c >> 4] | zTe5[z8.r[Regs_A]];
    z8.r[Regs_F] = z8.r[Regs_F] & -6 | d | parity_table[z8.r[Regs_A]]
};
z8oT[40] = function() {
    tss += 3;
    z8.r[Regs_F] & 64 && (tss += 5, z8.r2[Regs2_PC] += sXd(wQj(z8.r2[Regs2_PC])));
    z8.r2[Regs2_PC]++
};
z8oT[41] = function() {
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + (z8.r[Regs_L] | z8.r[Regs_H] << 8),
        d = ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 2048) >> 11 | ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 2048) >> 10 | (c & 2048) >> 9;
    tss += 7;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | (c & 65536 ? 1 : 0) | c >> 8 & 40 | hcat_[d]
};
z8oT[42] = function() {
    tss += 12;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    z8.r[Regs_L] = wQj(c++);
    z8.r[Regs_H] = wQj(c & 65535)
};
z8oT[43] = function() {
    tss += 2;
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) - 1 & 65535;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c
};
z8oT[44] = function() {
    z8.r[Regs_L] += 1;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfi_table[z8.r[Regs_L]]
};
z8oT[45] = function() {
    --z8.r[Regs_L];
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfd_table[z8.r[Regs_L]]
};
z8oT[46] = function() {
    tss += 3;
    z8.r[Regs_L] = wQj(z8.r2[Regs2_PC]++)
};
z8oT[47] = function() {
    z8.r[Regs_A] ^= 255;
    z8.r[Regs_F] = z8.r[Regs_F] & 197 | z8.r[Regs_A] & 40 | 18
};
z8oT[48] = function() {
    tss += 3;
    z8.r[Regs_F] & 1 || (tss += 5, z8.r2[Regs2_PC] += sXd(wQj(z8.r2[Regs2_PC])));
    z8.r2[Regs2_PC]++
};
z8oT[49] = function() {
    tss += 6;
    var c = wQj(z8.r2[Regs2_PC]++),
        d = wQj(z8.r2[Regs2_PC]++);
    z8.r2[Regs2_SP] = c | d << 8
};
z8oT[50] = function() {
    tss += 9;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    wQi(c, z8.r[Regs_A])
};
z8oT[51] = function() {
    tss += 2;
    z8.r2[Regs2_SP] += 1
};
z8oT[52] = function() {
    tss += 7;
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8),
        c = c + 1 & 255;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfi_table[c];
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c)
};
z8oT[53] = function() {
    tss += 7;
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8),
        c = c - 1 & 255;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfd_table[c];
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, c)
};
z8oT[54] = function() {
    tss += 6;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, wQj(z8.r2[Regs2_PC]++))
};
z8oT[55] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | z8.r[Regs_A] & 40 | 1
};
z8oT[56] = function() {
    tss += 3;
    z8.r[Regs_F] & 1 && (tss += 5, z8.r2[Regs2_PC] += sXd(wQj(z8.r2[Regs2_PC])));
    z8.r2[Regs2_PC]++
};
z8oT[57] = function() {
    var c = (z8.r[Regs_L] | z8.r[Regs_H] << 8) + z8.r2[Regs2_SP],
        d = ((z8.r[Regs_L] | z8.r[Regs_H] << 8) & 2048) >> 11 | (z8.r2[Regs2_SP] & 2048) >> 10 | (c & 2048) >> 9;
    tss += 7;
    z8.r[Regs_H] = c >> 8;
    z8.r[Regs_L] = c;
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | (c & 65536 ? 1 : 0) | c >> 8 & 40 | hcat_[d]
};
z8oT[58] = function() {
    tss += 9;
    var c = wQj(z8.r2[Regs2_PC]++),
        c = c | wQj(z8.r2[Regs2_PC]++) << 8;
    z8.r[Regs_A] = wQj(c)
};
z8oT[59] = function() {
    tss += 2;
    --z8.r2[Regs2_SP]
};
z8oT[60] = function() {
    z8.r[Regs_A] += 1;
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfi_table[z8.r[Regs_A]]
};
z8oT[61] = function() {
    --z8.r[Regs_A];
    z8.r[Regs_F] = z8.r[Regs_F] & 1 | bfd_table[z8.r[Regs_A]]
};
z8oT[62] = function() {
    tss += 3;
    z8.r[Regs_A] = wQj(z8.r2[Regs2_PC]++)
};
z8oT[63] = function() {
    z8.r[Regs_F] = z8.r[Regs_F] & 196 | (z8.r[Regs_F] & 1 ? 16 : 1) | z8.r[Regs_A] & 40
};
z8oT[65] = function() {
    z8.r[Regs_B] = z8.r[Regs_C]
};
z8oT[66] = function() {
    z8.r[Regs_B] = z8.r[Regs_D]
};
z8oT[67] = function() {
    z8.r[Regs_B] = z8.r[Regs_E]
};
z8oT[68] = function() {
    z8.r[Regs_B] = z8.r[Regs_H]
};
z8oT[69] = function() {
    z8.r[Regs_B] = z8.r[Regs_L]
};
z8oT[70] = function() {
    tss += 3;
    z8.r[Regs_B] = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8)
};
z8oT[71] = function() {
    z8.r[Regs_B] = z8.r[Regs_A]
};
z8oT[72] = function() {
    z8.r[Regs_C] = z8.r[Regs_B]
};
z8oT[74] = function() {
    z8.r[Regs_C] = z8.r[Regs_D]
};
z8oT[75] = function() {
    z8.r[Regs_C] = z8.r[Regs_E]
};
z8oT[76] = function() {
    z8.r[Regs_C] = z8.r[Regs_H]
};
z8oT[77] = function() {
    z8.r[Regs_C] = z8.r[Regs_L]
};
z8oT[78] = function() {
    tss += 3;
    z8.r[Regs_C] = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8)
};
z8oT[79] = function() {
    z8.r[Regs_C] = z8.r[Regs_A]
};
z8oT[80] = function() {
    z8.r[Regs_D] = z8.r[Regs_B]
};
z8oT[81] = function() {
    z8.r[Regs_D] = z8.r[Regs_C]
};
z8oT[83] = function() {
    z8.r[Regs_D] = z8.r[Regs_E]
};
z8oT[84] = function() {
    z8.r[Regs_D] = z8.r[Regs_H]
};
z8oT[85] = function() {
    z8.r[Regs_D] = z8.r[Regs_L]
};
z8oT[86] = function() {
    tss += 3;
    z8.r[Regs_D] = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8)
};
z8oT[87] = function() {
    z8.r[Regs_D] = z8.r[Regs_A]
};
z8oT[88] = function() {
    z8.r[Regs_E] = z8.r[Regs_B]
};
z8oT[89] = function() {
    z8.r[Regs_E] = z8.r[Regs_C]
};
z8oT[90] = function() {
    z8.r[Regs_E] = z8.r[Regs_D]
};
z8oT[92] = function() {
    z8.r[Regs_E] = z8.r[Regs_H]
};
z8oT[93] = function() {
    z8.r[Regs_E] = z8.r[Regs_L]
};
z8oT[94] = function() {
    tss += 3;
    z8.r[Regs_E] = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8)
};
z8oT[95] = function() {
    z8.r[Regs_E] = z8.r[Regs_A]
};
z8oT[96] = function() {
    z8.r[Regs_H] = z8.r[Regs_B]
};
z8oT[97] = function() {
    z8.r[Regs_H] = z8.r[Regs_C]
};
z8oT[98] = function() {
    z8.r[Regs_H] = z8.r[Regs_D]
};
z8oT[99] = function() {
    z8.r[Regs_H] = z8.r[Regs_E]
};
z8oT[101] = function() {
    z8.r[Regs_H] = z8.r[Regs_L]
};
z8oT[102] = function() {
    tss += 3;
    z8.r[Regs_H] = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8)
};
z8oT[103] = function() {
    z8.r[Regs_H] = z8.r[Regs_A]
};
z8oT[104] = function() {
    z8.r[Regs_L] = z8.r[Regs_B]
};
z8oT[105] = function() {
    z8.r[Regs_L] = z8.r[Regs_C]
};
z8oT[106] = function() {
    z8.r[Regs_L] = z8.r[Regs_D]
};
z8oT[107] = function() {
    z8.r[Regs_L] = z8.r[Regs_E]
};
z8oT[108] = function() {
    z8.r[Regs_L] = z8.r[Regs_H]
};
z8oT[110] = function() {
    tss += 3;
    z8.r[Regs_L] = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8)
};
z8oT[111] = function() {
    z8.r[Regs_L] = z8.r[Regs_A]
};
z8oT[112] = function() {
    tss += 3;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, z8.r[Regs_B])
};
z8oT[113] = function() {
    tss += 3;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, z8.r[Regs_C])
};
z8oT[114] = function() {
    tss += 3;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, z8.r[Regs_D])
};
z8oT[115] = function() {
    tss += 3;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, z8.r[Regs_E])
};
z8oT[116] = function() {
    tss += 3;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, z8.r[Regs_H])
};
z8oT[117] = function() {
    tss += 3;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, z8.r[Regs_L])
};
z8oT[118] = function() {
    z8.halted = 1;
    z8.r2[Regs2_PC]--
};
z8oT[119] = function() {
    tss += 3;
    wQi(z8.r[Regs_L] | z8.r[Regs_H] << 8, z8.r[Regs_A])
};
z8oT[120] = function() {
    z8.r[Regs_A] = z8.r[Regs_B]
};
z8oT[121] = function() {
    z8.r[Regs_A] = z8.r[Regs_C]
};
z8oT[122] = function() {
    z8.r[Regs_A] = z8.r[Regs_D]
};
z8oT[123] = function() {
    z8.r[Regs_A] = z8.r[Regs_E]
};
z8oT[124] = function() {
    z8.r[Regs_A] = z8.r[Regs_H]
};
z8oT[125] = function() {
    z8.r[Regs_A] = z8.r[Regs_L]
};
z8oT[126] = function() {
    tss += 3;
    z8.r[Regs_A] = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8)
};
z8oT[128] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_B],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_B] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[129] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_C],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_C] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[130] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_D],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_D] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[131] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_E],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_E] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[132] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_H],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_H] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[133] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_L],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_L] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[134] = function() {
    tss += 3;
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8),
        d = z8.r[Regs_A] + c,
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | hcat_[c & 7] | oAt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[135] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_A],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_A] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[136] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_B] + (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_B] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[137] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_C] + (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_C] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[138] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_D] + (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_D] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[139] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_E] + (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_E] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[140] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_H] + (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_H] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[141] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_L] + (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_L] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[142] = function() {
    tss += 3;
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8),
        d = z8.r[Regs_A] + c + (z8.r[Regs_F] & 1),
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | hcat_[c & 7] | oAt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[143] = function() {
    var c = z8.r[Regs_A] + z8.r[Regs_A] + (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_A] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | hcat_[d & 7] | oAt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[144] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_B],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_B] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[145] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_C],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_C] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[146] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_D],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_D] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[147] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_E],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_E] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[148] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_H],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_H] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[149] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_L],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_L] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[150] = function() {
    tss += 3;
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8),
        d = z8.r[Regs_A] - c,
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | 2 | hcst_[c & 7] | oSt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[151] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_A],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_A] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[152] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_B] - (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_B] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[153] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_C] - (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_C] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[154] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_D] - (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_D] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[155] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_E] - (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_E] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[156] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_H] - (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_H] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[157] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_L] - (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_L] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[158] = function() {
    tss += 3;
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8),
        d = z8.r[Regs_A] - c - (z8.r[Regs_F] & 1),
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | 2 | hcst_[c & 7] | oSt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[159] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_A] - (z8.r[Regs_F] & 1),
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_A] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_A] = c;
    z8.r[Regs_F] = (c & 256 ? 1 : 0) | 2 | hcst_[d & 7] | oSt[d >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[160] = function() {
    z8.r[Regs_A] &= z8.r[Regs_B];
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT[161] = function() {
    z8.r[Regs_A] &= z8.r[Regs_C];
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT[162] = function() {
    z8.r[Regs_A] &= z8.r[Regs_D];
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT[163] = function() {
    z8.r[Regs_A] &= z8.r[Regs_E];
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT[164] = function() {
    z8.r[Regs_A] &= z8.r[Regs_H];
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT[165] = function() {
    z8.r[Regs_A] &= z8.r[Regs_L];
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT[166] = function() {
    tss += 3;
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    z8.r[Regs_A] &= c;
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT[167] = function() {
    z8.r[Regs_A] &= z8.r[Regs_A];
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT[168] = function() {
    z8.r[Regs_A] ^= z8.r[Regs_B];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[169] = function() {
    z8.r[Regs_A] ^= z8.r[Regs_C];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[170] = function() {
    z8.r[Regs_A] ^= z8.r[Regs_D];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[171] = function() {
    z8.r[Regs_A] ^= z8.r[Regs_E];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[172] = function() {
    z8.r[Regs_A] ^= z8.r[Regs_H];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[173] = function() {
    z8.r[Regs_A] ^= z8.r[Regs_L];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[174] = function() {
    tss += 3;
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    z8.r[Regs_A] ^= c;
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[175] = function() {
    z8.r[Regs_A] ^= z8.r[Regs_A];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[176] = function() {
    z8.r[Regs_A] |= z8.r[Regs_B];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[177] = function() {
    z8.r[Regs_A] |= z8.r[Regs_C];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[178] = function() {
    z8.r[Regs_A] |= z8.r[Regs_D];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[179] = function() {
    z8.r[Regs_A] |= z8.r[Regs_E];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[180] = function() {
    z8.r[Regs_A] |= z8.r[Regs_H];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[181] = function() {
    z8.r[Regs_A] |= z8.r[Regs_L];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[182] = function() {
    tss += 3;
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8);
    z8.r[Regs_A] |= c;
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[183] = function() {
    z8.r[Regs_A] |= z8.r[Regs_A];
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[184] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_B],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_B] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_F] = (c & 256 ? 1 : c ? 0 : 64) | 2 | hcst_[d & 7] | oSt[d >> 4] | z8.r[Regs_B] & 40 | c & 128
};
z8oT[185] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_C],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_C] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_F] = (c & 256 ? 1 : c ? 0 : 64) | 2 | hcst_[d & 7] | oSt[d >> 4] | z8.r[Regs_C] & 40 | c & 128
};
z8oT[186] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_D],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_D] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_F] = (c & 256 ? 1 : c ? 0 : 64) | 2 | hcst_[d & 7] | oSt[d >> 4] | z8.r[Regs_D] & 40 | c & 128
};
z8oT[187] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_E],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_E] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_F] = (c & 256 ? 1 : c ? 0 : 64) | 2 | hcst_[d & 7] | oSt[d >> 4] | z8.r[Regs_E] & 40 | c & 128
};
z8oT[188] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_H],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_H] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_F] = (c & 256 ? 1 : c ? 0 : 64) | 2 | hcst_[d & 7] | oSt[d >> 4] | z8.r[Regs_H] & 40 | c & 128
};
z8oT[189] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_L],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_L] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_F] = (c & 256 ? 1 : c ? 0 : 64) | 2 | hcst_[d & 7] | oSt[d >> 4] | z8.r[Regs_L] & 40 | c & 128
};
z8oT[190] = function() {
    tss += 3;
    var c = wQj(z8.r[Regs_L] | z8.r[Regs_H] << 8),
        d = z8.r[Regs_A] - c,
        f = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_F] = (d & 256 ? 1 : d ? 0 : 64) | 2 | hcst_[f & 7] | oSt[f >> 4] | c & 40 | d & 128
};
z8oT[191] = function() {
    var c = z8.r[Regs_A] - z8.r[Regs_A],
        d = (z8.r[Regs_A] & 136) >> 3 | (z8.r[Regs_A] & 136) >> 2 | (c & 136) >> 1;
    z8.r[Regs_F] = (c & 256 ? 1 : c ? 0 : 64) | 2 | hcst_[d & 7] | oSt[d >> 4] | z8.r[Regs_A] & 40 | c & 128
};
z8oT[192] = function() {
    tss++;
    z8.r[Regs_F] & 64 || (tss += 3, b = wQj(z8.r2[Regs2_SP]++), tss += 3, a = wQj(z8.r2[Regs2_SP]++), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[193] = function() {
    tss += 6;
    z8.r[Regs_C] = wQj(z8.r2[Regs2_SP]++);
    z8.r[Regs_B] = wQj(z8.r2[Regs2_SP]++)
};
z8oT[194] = function() {
    tss += 6;
    z8.r[Regs_F] & 64 ? z8.r2[Regs2_PC] += 2 : (a = z8.r2[Regs2_PC], b = wQj(a++), a = wQj(a & 65535), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[195] = function() {
    tss += 6;
    var c = z8.r2[Regs2_PC],
        d = wQj(c++),
        c = wQj(c & 65535);
    z8.r2[Regs2_PC] = d | c << 8
};
z8oT[196] = function() {
    tss += 6;
    z8.r[Regs_F] & 64 ? z8.r2[Regs2_PC] += 2 : (b = wQj(z8.r2[Regs2_PC]++), tss += 1, a = wQj(z8.r2[Regs2_PC]++), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[197] = function() {
    tss += 7;
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r[Regs_B]);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r[Regs_C])
};
z8oT[198] = function() {
    tss += 3;
    var c = wQj(z8.r2[Regs2_PC]++),
        d = z8.r[Regs_A] + c,
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | hcat_[c & 7] | oAt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[199] = function() {
    tss += 7;
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255);
    z8.r2[Regs2_PC] = 0
};
z8oT[200] = function() {
    tss++;
    z8.r[Regs_F] & 64 && (tss += 3, b = wQj(z8.r2[Regs2_SP]++), tss += 3, a = wQj(z8.r2[Regs2_SP]++), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[201] = function() {
    tss += 6;
    var c = wQj(z8.r2[Regs2_SP]++),
        d = wQj(z8.r2[Regs2_SP]++);
    z8.r2[Regs2_PC] = c | d << 8
};
z8oT[202] = function() {
    tss += 6;
    z8.r[Regs_F] & 64 ? (a = z8.r2[Regs2_PC], b = wQj(a++), a = wQj(a & 65535), z8.r2[Regs2_PC] = b | a << 8) : z8.r2[Regs2_PC] += 2
};
z8oT[203] = function() {
    tss += 4;
    var c = wQj(z8.r2[Regs2_PC]++);
    z8.r[Regs_R] = z8.r[Regs_R] + 1 & 127;
    (c = z8oT_c203[c]) || (c = z8oT_c203[z8oT_c203.length - 1]);
    c()
};
z8oT[204] = function() {
    tss += 6;
    z8.r[Regs_F] & 64 ? (b = wQj(z8.r2[Regs2_PC]++), tss += 1, a = wQj(z8.r2[Regs2_PC]++), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255), z8.r2[Regs2_PC] = b | a << 8) : z8.r2[Regs2_PC] += 2
};
z8oT[205] = function() {
    tss += 13;
    var c = wQj(z8.r2[Regs2_PC]++),
        d = wQj(z8.r2[Regs2_PC]++);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255);
    z8.r2[Regs2_PC] = c | d << 8
};
z8oT[206] = function() {
    tss += 3;
    var c = wQj(z8.r2[Regs2_PC]++),
        d = z8.r[Regs_A] + c + (z8.r[Regs_F] & 1),
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | hcat_[c & 7] | oAt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[207] = function() {
    tss += 7;
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255);
    z8.r2[Regs2_PC] = 8
};
z8oT[208] = function() {
    tss++;
    z8.r[Regs_F] & 1 || (tss += 3, b = wQj(z8.r2[Regs2_SP]++), tss += 3, a = wQj(z8.r2[Regs2_SP]++), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[209] = function() {
    tss += 6;
    z8.r[Regs_E] = wQj(z8.r2[Regs2_SP]++);
    z8.r[Regs_D] = wQj(z8.r2[Regs2_SP]++)
};
z8oT[210] = function() {
    tss += 6;
    z8.r[Regs_F] & 1 ? z8.r2[Regs2_PC] += 2 : (a = z8.r2[Regs2_PC], b = wQj(a++), a = wQj(a & 65535), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[211] = function() {
    tss += 7;
    var c = wQj(z8.r2[Regs2_PC]++) + (z8.r[Regs_A] << 8);
    ti_common_out(c, z8.r[Regs_A])
};
z8oT[212] = function() {
    tss += 6;
    z8.r[Regs_F] & 1 ? z8.r2[Regs2_PC] += 2 : (b = wQj(z8.r2[Regs2_PC]++), tss += 1, a = wQj(z8.r2[Regs2_PC]++), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[213] = function() {
    tss += 7;
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r[Regs_D]);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r[Regs_E])
};
z8oT[214] = function() {
    tss += 3;
    var c = wQj(z8.r2[Regs2_PC]++),
        d = z8.r[Regs_A] - c,
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | 2 | hcst_[c & 7] | oSt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[215] = function() {
    tss += 7;
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255);
    z8.r2[Regs2_PC] = 16
};
z8oT[216] = function() {
    tss++;
    z8.r[Regs_F] & 1 && (tss += 6, b = wQj(z8.r2[Regs2_SP]++), a = wQj(z8.r2[Regs2_SP]++), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[217] = function() {
    var c = z8.r[Regs_B];
    z8.r[Regs_B] = z8.r[Regs_B_];
    z8.r[Regs_B_] = c;
    c = z8.r[Regs_C];
    z8.r[Regs_C] = z8.r[Regs_C_];
    z8.r[Regs_C_] = c;
    c = z8.r[Regs_D];
    z8.r[Regs_D] = z8.r[Regs_D_];
    z8.r[Regs_D_] = c;
    c = z8.r[Regs_E];
    z8.r[Regs_E] = z8.r[Regs_E_];
    z8.r[Regs_E_] = c;
    c = z8.r[Regs_H];
    z8.r[Regs_H] = z8.r[Regs_H_];
    z8.r[Regs_H_] = c;
    c = z8.r[Regs_L];
    z8.r[Regs_L] = z8.r[Regs_L_];
    z8.r[Regs_L_] = c
};
z8oT[218] = function() {
    tss += 6;
    z8.r[Regs_F] & 1 ? (a = z8.r2[Regs2_PC], b = wQj(a++), a = wQj(a & 65535), z8.r2[Regs2_PC] = b | a << 8) : z8.r2[Regs2_PC] += 2
};
z8oT[219] = function() {
    tss += 7;
    var c = wQj(z8.r2[Regs2_PC]++) + (z8.r[Regs_A] << 8);
    z8.r[Regs_A] = ti_common_in(c)
};
z8oT[220] = function() {
    tss += 6;
    z8.r[Regs_F] & 1 ? (b = wQj(z8.r2[Regs2_PC]++), tss += 1, a = wQj(z8.r2[Regs2_PC]++), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255), z8.r2[Regs2_PC] = b | a << 8) : z8.r2[Regs2_PC] += 2
};
z8oT[221] = function() {
    tss += 4;
    var c = wQj(z8.r2[Regs2_PC]++);
    z8.r[Regs_R] = z8.r[Regs_R] + 1 & 127;
    (c = z8oT_c221[c]) || (c = z8oT_c221[z8oT_c221.length - 1]);
    c()
};
z8oT[222] = function() {
    tss += 3;
    var c = wQj(z8.r2[Regs2_PC]++),
        d = z8.r[Regs_A] - c - (z8.r[Regs_F] & 1),
        c = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_A] = d;
    z8.r[Regs_F] = (d & 256 ? 1 : 0) | 2 | hcst_[c & 7] | oSt[c >> 4] | zTe5[z8.r[Regs_A]]
};
z8oT[223] = function() {
    tss += 7;
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255);
    z8.r2[Regs2_PC] = 24
};
z8oT[224] = function() {
    tss++;
    z8.r[Regs_F] & 4 || (tss += 3, b = wQj(z8.r2[Regs2_SP]++), tss += 3, a = wQj(z8.r2[Regs2_SP]++), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[225] = function() {
    tss += 6;
    z8.r[Regs_L] = wQj(z8.r2[Regs2_SP]++);
    z8.r[Regs_H] = wQj(z8.r2[Regs2_SP]++)
};
z8oT[226] = function() {
    tss += 6;
    z8.r[Regs_F] & 4 ? z8.r2[Regs2_PC] += 2 : (a = z8.r2[Regs2_PC], b = wQj(a++), a = wQj(a & 65535), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[227] = function() {
    var c = wQj(z8.r2[Regs2_SP]),
        d = wQj(z8.r2[Regs2_SP] + 1);
    tss += 15;
    wQi(z8.r2[Regs2_SP] + 1, z8.r[Regs_H]);
    wQi(z8.r2[Regs2_SP], z8.r[Regs_L]);
    z8.r[Regs_L] = c;
    z8.r[Regs_H] = d
};
z8oT[228] = function() {
    tss += 6;
    z8.r[Regs_F] & 4 ? z8.r2[Regs2_PC] += 2 : (b = wQj(z8.r2[Regs2_PC]++), tss += 1, a = wQj(z8.r2[Regs2_PC]++), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[229] = function() {
    tss++;
    z8.r2[Regs2_SP]--;
    tss += 3;
    wQi(z8.r2[Regs2_SP], z8.r[Regs_H]);
    z8.r2[Regs2_SP]--;
    tss += 3;
    wQi(z8.r2[Regs2_SP], z8.r[Regs_L])
};
z8oT[230] = function() {
    tss += 3;
    var c = wQj(z8.r2[Regs2_PC]++);
    z8.r[Regs_A] &= c;
    z8.r[Regs_F] = 16 | zTe6[z8.r[Regs_A]]
};
z8oT[231] = function() {
    tss++;
    z8.r2[Regs2_SP]--;
    tss += 6;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255);
    z8.r2[Regs2_PC] = 32
};
z8oT[232] = function() {
    tss++;
    z8.r[Regs_F] & 4 && (tss += 3, b = wQj(z8.r2[Regs2_SP]++), tss += 3, a = wQj(z8.r2[Regs2_SP]++), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[233] = function() {
    z8.r2[Regs2_PC] = z8.r[Regs_L] | z8.r[Regs_H] << 8
};
z8oT[234] = function() {
    tss += 6;
    z8.r[Regs_F] & 4 ? (a = z8.r2[Regs2_PC], b = wQj(a++), a = wQj(a & 65535), z8.r2[Regs2_PC] = b | a << 8) : z8.r2[Regs2_PC] += 2
};
z8oT[235] = function() {
    var c = z8.r[Regs_D];
    z8.r[Regs_D] = z8.r[Regs_H];
    z8.r[Regs_H] = c;
    c = z8.r[Regs_E];
    z8.r[Regs_E] = z8.r[Regs_L];
    z8.r[Regs_L] = c
};
z8oT[236] = function() {
    tss += 6;
    z8.r[Regs_F] & 4 ? (b = wQj(z8.r2[Regs2_PC]++), tss += 1, a = wQj(z8.r2[Regs2_PC]++), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8), z8.r2[Regs2_SP]--, z8.r2[Regs2_SP] &= 65535, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255), z8.r2[Regs2_PC] = b | a << 8) : z8.r2[Regs2_PC] += 2
};
z8oT[237] = function() {
    tss += 4;
    var c = wQj(z8.r2[Regs2_PC]++);
    z8.r[Regs_R] = z8.r[Regs_R] + 1 & 127;
    (c = z8oT_c237[c]) || (c = z8oT_c237[z8oT_c237.length - 1]);
    c()
};
z8oT[238] = function() {
    tss += 3;
    var c = wQj(z8.r2[Regs2_PC]++);
    z8.r[Regs_A] ^= c;
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[239] = function() {
    tss += 7;
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255);
    z8.r2[Regs2_PC] = 40
};
z8oT[240] = function() {
    tss++;
    z8.r[Regs_F] & 128 || (tss += 3, b = wQj(z8.r2[Regs2_SP]++), tss += 3, a = wQj(z8.r2[Regs2_SP]++), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[241] = function() {
    tss += 6;
    z8.r[Regs_F] = wQj(z8.r2[Regs2_SP]++);
    z8.r[Regs_A] = wQj(z8.r2[Regs2_SP]++)
};
z8oT[242] = function() {
    tss += 6;
    z8.r[Regs_F] & 128 ? z8.r2[Regs2_PC] += 2 : (a = z8.r2[Regs2_PC], b = wQj(a++), a = wQj(a & 65535), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[243] = function() {
    z8.iff1 = z8.iff2 = 0
};
z8oT[244] = function() {
    tss += 6;
    z8.r[Regs_F] & 128 ? z8.r2[Regs2_PC] += 2 : (b = wQj(z8.r2[Regs2_PC]++), tss += 1, a = wQj(z8.r2[Regs2_PC]++), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[245] = function() {
    tss += 7;
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r[Regs_A]);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r[Regs_F])
};
z8oT[246] = function() {
    tss += 3;
    var c = wQj(z8.r2[Regs2_PC]++);
    z8.r[Regs_A] |= c;
    z8.r[Regs_F] = zTe6[z8.r[Regs_A]]
};
z8oT[247] = function() {
    tss += 7;
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8);
    z8.r2[Regs2_SP]--;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255);
    z8.r2[Regs2_PC] = 48
};
z8oT[248] = function() {
    tss++;
    z8.r[Regs_F] & 128 && (tss += 3, b = wQj(z8.r2[Regs2_SP]++), tss += 3, a = wQj(z8.r2[Regs2_SP]++), z8.r2[Regs2_PC] = b | a << 8)
};
z8oT[249] = function() {
    tss += 2;
    z8.r2[Regs2_SP] = z8.r[Regs_L] | z8.r[Regs_H] << 8
};
z8oT[250] = function() {
    tss += 6;
    z8.r[Regs_F] & 128 ? (a = z8.r2[Regs2_PC], b = wQj(a++), a = wQj(a & 65535), z8.r2[Regs2_PC] = b | a << 8) : z8.r2[Regs2_PC] += 2
};
z8oT[251] = function() {
    z8.iff1 = z8.iff2 = 1;
    z8.ie = 2
};
z8oT[252] = function() {
    tss += 6;
    z8.r[Regs_F] & 128 ? (b = wQj(z8.r2[Regs2_PC]++), tss += 1, a = wQj(z8.r2[Regs2_PC]++), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8), z8.r2[Regs2_SP]--, tss += 3, wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255), z8.r2[Regs2_PC] = b | a << 8) : z8.r2[Regs2_PC] += 2
};
z8oT[253] = function() {
    tss += 4;
    var c = wQj(z8.r2[Regs2_PC]++);
    z8.r[Regs_R] = z8.r[Regs_R] + 1 & 127;
    (c = z8oT_c253[c]) || (c = z8oT_c253[z8oT_c253.length - 1]);
    c()
};
z8oT[254] = function() {
    tss += 3;
    var c = wQj(z8.r2[Regs2_PC]++),
        d = z8.r[Regs_A] - c,
        f = (z8.r[Regs_A] & 136) >> 3 | (c & 136) >> 2 | (d & 136) >> 1;
    z8.r[Regs_F] = (d & 256 ? 1 : d ? 0 : 64) | 2 | hcst_[f & 7] | oSt[f >> 4] | c & 40 | d & 128
};
z8oT[255] = function() {
    tss++;
    z8.r2[Regs2_SP]--;
    tss += 3;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] >> 8);
    z8.r2[Regs2_SP]--;
    tss += 3;
    wQi(z8.r2[Regs2_SP], z8.r2[Regs2_PC] & 255);
    z8.r2[Regs2_PC] = 56
};
z8oT[256] = z8oT[255];
var LINKDELAY = 6E6;

function Link() {
    this.packetstart = -1;
    this.curfull_file = "";
    this.curfull_offset = 0;
    this.data_dat = "";
    this.data_len = 0;
    this.gcn_send_frame = function(c) {};
    this.gcn_recv_frame = function(c) {};
    this.send_byte = function(c, d) {
        var f = 0;
        d || (d = LINKDELAY);
        if (i6.type != CTyE.CTyQ && i6.type != CTyE.CTyP && !(i6.portbuf[PSEnumX.PORT8] & 128)) {
            var e = 80;
            for (i6.portbuf[PSEnumX.PORT9] |= 8; i6.portbuf[PSEnumX.PORT9] & 16 && f < d;) calculator_run_timed(50), f += 50;
            i6.portbuf[PSEnumX.PORT9] & 16 ||
                (i6.portbuf[PSEnumX.PORTA] = c & 255, i6.portbuf[PSEnumX.PORT9] |= 16, e = 0);
            i6.portbuf[PSEnumX.PORT9] &= -9;
            i6.portbuf[PSEnumX.PORT8] & 1 && (i6.portbuf[PSEnumX.PORT9] |= 1, z8_interrupt_fire());
            return e
        }
        for (e = 0; 8 > e; e++) {
            emu.link_state = 2 - (c & 1);
            for (f = 0; f < d && 3 == emu.partner_link; f += 50) calculator_run_timed(50);
            if (f >= d) return emu.link_state = 3, e + 1;
            emu.link_state = 3;
            for (f = 0; f < d && 3 != emu.partner_link; f += 50) calculator_run_timed(50);
            if (f >= d) return e + 11;
            c >>= 1
        }
        return 0
    };
    this.recv_byte = function(c) {
        var d = 0,
            f =
            0;
        c || (c = LINKDELAY);
        if (i6.type != CTyE.CTyQ && i6.type != CTyE.CTyP && !(i6.portbuf[PSEnumX.PORT8] & 128)) {
            for (d = 0; 0 >= i6.la_outstamp && d < c; d += 50) calculator_run_timed(50);
            return 0 < i6.la_outstamp ? (i6.la_outstamp = -1, i6.portbuf[PSEnumX.PORT9] |= 32, c = i6.portbuf[PSEnumX.PORTD] & 255, i6.portbuf[PSEnumX.PORT8] & 2 && (i6.portbuf[PSEnumX.PORT9] |= 2, z8_interrupt_fire()), c) : -100
        }
        for (var e = 0; 8 > e; e++) {
            emu.link_state = 3;
            for (d = 0; d < c && 3 == emu.partner_link; d += 50) calculator_run_timed(50);
            if (d >= c) return -1;
            f = f >> 1 | emu.partner_link << 7 & 128;
            emu.link_state = emu.partner_link ^ 3;
            for (d = 0; d < c && 3 != emu.partner_link; d += 50) calculator_run_timed(50);
            if (d >= c) return emu.link_state = 3, -2
        }
        emu.link_state = 3;
        return f
    };
    this.send_data = function(c, d, f, e) {
        for (var g = 0; g < d; g++) {
            if (retval = this.send_byte(c[g], 0 == g ? 6E6 : LINKDELAY)) return g + 1 + .01 * retval;
            if ((g == d - 1 || 0 == g % 32) && null != e && 0 < e.length) window[e](1, f, d, "", g + 1)
        }
        return 0
    };
}
var link = new Link;

function md5_calcop(c) {
    var d = c[0],
        f = c[1],
        e = c[2],
        g = c[3],
        l = c[4],
        h = c[5],
        m = c[6];
    switch (c[7]) {
        case 0:
            return md5_ff(d, f, e, g, l, m, h);
        case 1:
            return md5_gg(d, f, e, g, l, m, h);
        case 2:
            return md5_hh(d, f, e, g, l, m, h);
        case 3:
            return md5_ii(d, f, e, g, l, m, h)
    }
    return 0
}

function md5_cmn(c, d, f, e, g, l) {
    return safe_add(bit_rol(safe_add(safe_add(d, c), safe_add(e, l)), g), f)
}

function md5_ff(c, d, f, e, g, l, h) {
    return md5_cmn(d & f | ~d & e, c, d, g, l, h)
}

function md5_gg(c, d, f, e, g, l, h) {
    return md5_cmn(d & e | f & ~e, c, d, g, l, h)
}

function md5_hh(c, d, f, e, g, l, h) {
    return md5_cmn(d ^ f ^ e, c, d, g, l, h)
}

function md5_ii(c, d, f, e, g, l, h) {
    return md5_cmn(f ^ (d | ~e), c, d, g, l, h)
}

function safe_add(c, d) {
    var f = (c & 65535) + (d & 65535);
    return (c >> 16) + (d >> 16) + (f >> 16) << 16 | f & 65535
}

function bit_rol(c, d) {
    return c << d | c >>> 32 - d
};
UTEnum = {
    LOOP: 1,
    INTERRUPT: 2,
    OVERFLOW: 4,
    FINISHED_INT: 128,
    FINISHED: 256,
    NO_HALT_INT: 512
};

function timer_timerval(c) {
    var d = timer_overflow_duration(c);
    c = c[0] & 128 ? timer_get_timer_clocks(c) : timer_get_timer_usecs(c);
    c = Math.floor(256 * c / d) % 256;
    return 0 > c ? 0 : c
}

function timer_overflow_duration(c) {
    return timer_duration(c[0], 256)
}

function timer_normal_duration(c) {
    return c[1] ? timer_duration(c[0], c[1]) : timer_duration(c[0], 256)
}

function timer_get_timer_clocks(c) {
    return c[3] - tss
}

function timer_get_timer_usecs(c) {
    return 1E6 * (timer_get_timer_clocks(c) / z8.speed)
}

function timer_duration(c, d) {
    var f = 0;
    if (c & 128) return c & 32 ? 64 * d : c & 16 ? 32 * d : c & 8 ? 16 * d : c & 4 ? 8 * d : c & 2 ? 4 * d : c & 1 ? 2 * d : d;
    if (c & 64) {
        switch (c & 7) {
            case 0:
                f = 3E6;
                break;
            case 1:
                f = 33E6;
                break;
            case 2:
                f = 328E6;
                break;
            case 3:
                f = 3277E6;
                break;
            case 4:
                f = 1E6;
                break;
            case 5:
                f = 16E6;
                break;
            case 6:
                f = 256E6;
                break;
            case 7:
                f = 4096E6
        }
        return (f * d + 16384) / 32768
    }
    return 0
}

function timer_set_frequency(c, d) {
    c[1] = timer_timerval(c);
    c[0] = d
}

function timer_set_mode(c, d) {
    c[2] = c[2] & UTEnum.NO_HALT_INT | d & 3;
    d & UTEnum.LOOP || 0 == c[1] || timer_set_period(c, 0)
}

function timer_start(c, d) {
    c[1] = d;
    var f = timer_normal_duration(c);
    if (f) {
        var e;
        e = !d || c[2] & UTEnum.FINISHED ? timer_overflow_duration(c) : c[2] & UTEnum.LOOP ? f : 0;
        timer_set_timer(c, f, e, c[0] & 128 ? 0 : 1)
    }
}

function timer_set_period(c, d) {
    c[4] = d
}

function timer_set_timer(c, d, f, e) {
    var g = 0,
        g = e ? Math.floor(z8.speed / 1E6 * d) : d;
    c[3] = tss + g;
    c[4] = f;
    for (d = 0; d < emu.ct_num; d++)
        if (emu.ct_ids[d] == c[5]) {
            emu.ct_cnt[d] = g;
            return
        } emu.ct_ids.push(c[5]);
    emu.ct_cnt.push(g);
    emu.ct_num++
}

function timer_expired(c) {
    var d;
    switch (c) {
        case 0:
            d = i6.timer0;
            break;
        case 1:
            d = i6.timer1;
            break;
        case 2:
            d = i6.timer2
    }
    d[2] |= UTEnum.FINISHED_INT;
    d[2] & UTEnum.INTERRUPT && (i6.it_active_timer = 1);
    d[2] & UTEnum.LOOP && timer_start(d, d[1])
};

function i6_swap_rom_page(c, d, f) {
    var e, g, l, h;
    i6.bank_a = c;
    i6.bank_b = d;
    i6.bank_c = f;
    g = 128;
    h = 7;
    var m = i6.rompages - 1;
    i6.type == CTyE.CTyQ && (g = 64, h = 1);
    i6.subtype == CTyE.CTySCSE && (m = i6.rompages / 2 - 1);
    c & g ? (c &= h, e = 0, l = 1) : (c &= m, i6.subtype == CTyE.CTySCSE && (c += 128 * (i6.portbuf[PSEnumX.PORTE] & 1)), e = 1, l = 0);
    d & g ? (d &= h, g = 0, h = 1) : (d &= m, i6.subtype == CTyE.CTySCSE && (d += 128 * (i6.portbuf[PSEnumX.PORTF] & 1)), g = 1, h = 0);
    f &= 7;
    i6.mmap ? (m = c & 254, i6.mut[1] = l, i6.exc[1] = i6.run_lock[m + (1 == e ? 0 : i6.rompages)], m <<= 14, i6.page[1] = 1 == e ? -1 - m : m) : (i6.page[1] = 1 == e ? -1 - (c << 14) : c << 14, i6.mut[1] = l, i6.exc[1] = i6.run_lock[c + (1 == e ? 0 : i6.rompages)]);
    i6.mmap ? i6.type == CTyE.CTyQ ? (i6.page[2] = 1 == e ? -1 - (c << 14) : c << 14, i6.mut[2] = l, i6.exc[2] = i6.run_lock[c + (1 == e ? 0 : i6.rompages)]) : (m = c | 1, i6.mut[2] = l, i6.exc[2] = i6.run_lock[m + (1 == e ? 0 : i6.rompages)], m <<= 14,
        i6.page[2] = 1 == e ? -1 - m : m) : (i6.page[2] = 1 == g ? -1 - (d << 14) : d << 14, i6.mut[2] = h, i6.exc[2] = i6.run_lock[d + (1 == g ? 0 : i6.rompages)]);
    i6.mmap ? (i6.page[3] = 1 == g ? -1 - (d << 14) : d << 14, i6.mut[3] = h, i6.exc[3] = i6.run_lock[d + (1 == g ? 0 : i6.rompages)]) : i6.type == CTyE.CTyQ ? (i6.page[3] = 0, i6.mut[3] = 1, i6.exc[3] = i6.run_lock[0 + i6.rompages]) : (i6.page[3] = f << 14, i6.mut[3] = 1, i6.exc[3] = i6.run_lock[f + i6.rompages])
}

function i6_write_normal(c, d) {
    var f, e = i6.page[f = c >> 14];
    9999 != e && (1 < f && i6.type != CTyE.CTyQ && (c > 65535 - 64 * i6.portbuf[PSEnumX.PORT27] ? e = 0 : 32768 <= c && c < 32768 + 64 * i6.portbuf[PSEnumX.PORT28] && (e = 1)), i6.mut[f] ? 0 > e ? i6.rom[-1 - e + (c & 16383)] = d : i6.ram[e + (c & 16383)] = d : i6.flash_lock & 1 && flash_write(-1 - e + (c & 16383), d))
}

function i6_read_flashid(c) {
    var d = 0,
        f = 0;
    if (0 == c) d = 194, f = 1;
    else if (2 == c) {
        switch (i6.type) {
            case CTyE.CTyQ:
                d = 185;
                break;
            case CTyE.CTyS:
                d = 218;
                break;
            default:
                d = 196
        }
        f = 1
    } else d = i6_read_port2728(c);
    f && (flash.phase = FlashModeEnum.FLASH_RESET, i6_mem_chmode());
    return d
}

function i6_read_port2728(c) {
    var d, f = i6.page[d = c >> 14];
    if (9999 == f) return 255;
    1 < d && i6.type != CTyE.CTyQ && (c > 65535 - 64 * i6.portbuf[PSEnumX.PORT27] ? f = 0 : 32768 <= c && c < 32768 + 64 * i6.portbuf[PSEnumX.PORT28] && (f = 16384));
    c == z8.r2[Regs2_PC] && i6.exc[d] && (z8.halted = 2);
    if (0 <= f) return i6.prot_buffer[i6.prot_cnt++] = 255, i6.prot_cnt &= 7, i6.ram[f + (c & 16383)];
    d = 0;
    d = i6.rom[-1 - f + (c & 16383)];
    i6.prot_buffer[i6.prot_cnt++] = (-1 - f >> 14 & i6.priv_page_mask) == i6.priv_page_val ?
        d : 255;
    i6.prot_cnt &= 7;
    return d
}

function i5_swap_rom_page(c, d, f) {
    var e, g, l, h, m, n;
    i6.bank_a = c;
    i6.bank_b = d;
    i6.bank_c = f;
    l = i6.rompages - 1;
    n = i6.type == CTyE.CALC_TYPE_82 ? 8 : 16;
    c & n ? (c &= 1, e = 0, h = 1) : (c &= l, e = 1, h = 0);
    d & n ? (d &= 1, g = 0, m = 1) : (d &= l, g = 1, m = 0);
    f & n ? (f &= 1, l = 0, n = 1) : (f &= l, l = 1, n = 0);
    i6.page[1] = 1 == e ? -1 - (c << 14) : c << 14;
    i6.mut[1] = h;
    i6.exc[1] = 0;
    i6.page[2] = 1 == g ? -1 - (d << 14) : d << 14;
    i6.mut[2] = m;
    i6.exc[2] = 0;
    i6.page[3] = 1 == l ? -1 - (f << 14) : f << 14;
    i6.mut[3] = n;
    i6.exc[3] = 0
}

function i6_read_normal(c) {
    var d, f = i6.page[d = c >> 14];
    if (9999 == f) return 255;
    c == z8.r2[Regs2_PC] && i6.exc[d] && (z8.halted = 2);
    if (0 <= f) return i6.prot_buffer[i6.prot_cnt++] = 255, i6.prot_cnt &= 7, i6.ram[f + (c & 16383)];
    d = 0;
    d = i6.rom[-1 - f + (c & 16383)];
    i6.prot_buffer[i6.prot_cnt++] = (-1 - f >> 14 & i6.priv_page_mask) == i6.priv_page_val ? d : 255;
    i6.prot_cnt &= 7;
    return d
}

function i6_rmem(c) {
    var d = i6.page[tmp = c >> 14];
    if (9999 == d) return 255;
    1 < tmp && i6.type != CTyE.CTyQ && (c > 65535 - 64 * i6.portbuf[PSEnumX.PORT27] ? d = 0 : 32768 <= c && c < 32768 + 64 * i6.portbuf[PSEnumX.PORT28] && (d = 16384));
    return 0 > d ? i6.rom[-1 - d + (c & 16383)] : i6.ram[d + (c & 16383)]
}

function i5_write_normal(c, d) {
    var f, e = i6.page[f = c >> 14];
    9999 != e && i6.mut[f] && 0 <= e && (i6.ram[e + (c & 16383)] = d)
}

function i5_read(c) {
    var d, f = i6.page[d = c >> 14];
    if (9999 == f) return 255;
    c == z8.r2[Regs2_PC] && i6.exc[d] && (z8.halted = 2);
    return 0 <= f ? i6.ram[f + (c & 16383)] : i6.rom[-1 - f + (c & 16383)]
}

function i6_read_watch(c) {
    return readbyte_sub(c)
}

function i6_write_watch(c, d) {
    return writebyte_sub(c, d)
}
var i6_read = i6_read_normal,
    i6_write = i6_write_normal,
    wQj = i6_read_normal,
    wQi = i6_write_normal,
    readbyte_sub = function() {},
    writebyte_sub = function() {};

function i6_mem_chmode(c) {
    wQi = i6_write_normal;
    if (i6.type == CTyE.CTyP || i6.type == CTyE.CALC_TYPE_82) {
        i6_read = i5_read;
        i6_write = i5_write_normal;
        wQj = i5_read;
        wQi = i5_write_normal;
    } else {
        if (null != c) {
            switch (c) {
                case 0:
                    wQj = i6_read = i6_read_normal;
                    break;
                case 1:
                    wQj = i6_read = i6_read_flashid;
                    break;
                case 2:
                    wQj = i6_read = i6_read_port2728;
                    break;
            }
        } else {
            wQj = flash.phase == FlashModeEnum.FLASH_ID ? i6_read = i6_read_flashid : i6.type == CTyE.CTyQ || 0 == i6.portbuf[PSEnumX.PORT27] && 0 == i6.portbuf[PSEnumX.PORT28] ? i6_read = i6_read_normal : i6_read = i6_read_port2728;
        }
    }
};

function process_file(c) {
    return new Promise((resolve, reject) => {
        if ("**TI82**" == c.substring(0, 8) || "**TI83**" == c.substring(0, 8) || "**TI83F*" == c.substring(0, 8)) {
            running = false;
            ti_common_send_file(c, 0, function () {
                start();
                resolve();
            });
        } else {
            reject();
        }
    });
}
