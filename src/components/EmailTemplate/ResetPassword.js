export default ({ url,name }) => {
  const ResetPassword = `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title></title>
    <style type="text/css" rel="stylesheet" media="all">
        /* Base ------------------------------ */

        @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");

        body {
            width: 100% !important;
            height: 100%;
            margin: 0;
        }

        a {
            color: #3869D4;
        }

        a img {
            border: none;
        }

        .logo {
            width: 33%;
            margin-left: auto;
            margin-right: auto;

        }

        td {
            word-break: break-word;
        }

        .preheader {
            display: none !important;
            visibility: hidden;
            mso-hide: all;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
        }

        /* Type ------------------------------ */

        body,
        td,
        th {
            font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
        }

        h1 {
            margin-top: 0;
            color: #333333;
            font-size: 22px;
            font-weight: bold;
            text-align: left;
        }

        h2 {
            margin-top: 0;
            color: #333333;
            font-size: 16px;
            font-weight: bold;
            text-align: left;
        }

        h3 {
            margin-top: 0;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
            text-align: left;
        }

        td,
        th {
            font-size: 16px;
        }

        p,
        ul,
        ol,
        blockquote {
            margin: .4em 0 1.1875em;
            font-size: 16px;
            line-height: 1.625;
        }

        p.sub {
            font-size: 13px;
        }

        /* Utilities ------------------------------ */

        .align-right {
            text-align: right;
        }

        .align-left {
            text-align: left;
        }

        .align-center {
            text-align: center;
        }

        .u-margin-bottom-none {
            margin-bottom: 0;
        }

        /* Buttons ------------------------------ */

        .button {
            background-color: #3869D4;
            border-top: 10px solid #3869D4;
            border-right: 18px solid #3869D4;
            border-bottom: 10px solid #3869D4;
            border-left: 18px solid #3869D4;
            display: inline-block;
            color: #FFF;
            text-decoration: none;
            border-radius: 3px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
            box-sizing: border-box;
        }

        .button--green {
            background-color: black;
            border-top: 10px solid black;
            border-right: 18px solid black;
            border-bottom: 10px solid black;
            border-left: 18px solid black;
        }

        .button--red {
            background-color: #FF6136;
            border-top: 10px solid #FF6136;
            border-right: 18px solid #FF6136;
            border-bottom: 10px solid #FF6136;
            border-left: 18px solid #FF6136;
        }

        @media only screen and (max-width: 500px) {
            .button {
                width: 100% !important;
                text-align: center !important;
            }
        }

        /* Attribute list ------------------------------ */

        .attributes {
            margin: 0 0 21px;
        }

        .attributes_content {
            background-color: #F4F4F7;
            padding: 16px;
        }

        .attributes_item {
            padding: 0;
        }

        /* Related Items ------------------------------ */

        .related {
            width: 100%;
            margin: 0;
            padding: 25px 0 0 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
        }

        .related_item {
            padding: 10px 0;
            color: #CBCCCF;
            font-size: 15px;
            line-height: 18px;
        }

        .related_item-title {
            display: block;
            margin: .5em 0 0;
        }

        .related_item-thumb {
            display: block;
            padding-bottom: 10px;
        }

        .related_heading {
            border-top: 1px solid #CBCCCF;
            text-align: center;
            padding: 25px 0 10px;
        }

        /* Discount Code ------------------------------ */

        .discount {
            width: 100%;
            margin: 0;
            padding: 24px;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #F4F4F7;
            border: 2px dashed #CBCCCF;
        }

        .discount_heading {
            text-align: center;
        }

        .discount_body {
            text-align: center;
            font-size: 15px;
        }

        /* Social Icons ------------------------------ */

        .social {
            width: auto;
        }

        .social td {
            padding: 0;
            width: auto;
        }

        .social_icon {
            height: 20px;
            margin: 0 8px 10px 8px;
            padding: 0;
        }

        /* Data table ------------------------------ */

        .purchase {
            width: 100%;
            margin: 0;
            padding: 35px 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
        }

        .purchase_content {
            width: 100%;
            margin: 0;
            padding: 25px 0 0 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
        }

        .purchase_item {
            padding: 10px 0;
            color: #51545E;
            font-size: 15px;
            line-height: 18px;
        }

        .purchase_heading {
            padding-bottom: 8px;
            border-bottom: 1px solid #EAEAEC;
        }

        .purchase_heading p {
            margin: 0;
            color: #85878E;
            font-size: 12px;
        }

        .purchase_footer {
            padding-top: 15px;
            border-top: 1px solid #EAEAEC;
        }

        .purchase_total {
            margin: 0;
            text-align: right;
            font-weight: bold;
            color: #333333;
        }

        .purchase_total--label {
            padding: 0 15px 0 0;
        }

        body {
            background-color: #ffffff;
            color: #51545E;
        }

        p {
            color: #51545E;
        }

        .email-wrapper {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #ffffff;
        }

        .email-content {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
        }

        /* Masthead ----------------------- */

        .email-masthead {
            padding: 25px 0;
            text-align: center;
        }

        .email-masthead_logo {
            width: 94px;
        }

        .email-masthead_name {
            font-size: 16px;
            font-weight: bold;
            color: #A8AAAF;
            text-decoration: none;
            text-shadow: 0 1px 0 white;
        }

        /* Body ------------------------------ */

        .email-body {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
        }

        .email-body_inner {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #FFFFFF;
        }

        .email-footer {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            text-align: center;
        }

        .email-footer p {
            color: #A8AAAF;
        }

        .body-action {
            width: 100%;
            margin: 30px auto;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            text-align: center;
        }

        .body-sub {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #EAEAEC;
        }

        .content-cell {
            padding: 45px;
        }

        /*Media Queries ------------------------------ */

        @media only screen and (max-width: 600px) {

            .email-body_inner,
            .email-footer {
                width: 100% !important;
            }
        }

        @media (prefers-color-scheme: dark) {

            body,
            .email-body,
            .email-body_inner,
            .email-content,
            .email-wrapper,
            .email-masthead,
            .email-footer {
                background-color: #333333 !important;
                color: #FFF !important;
            }

            p,
            ul,
            ol,
            blockquote,
            h1,
            h2,
            h3,
            span,
            .purchase_item {
                color: #FFF !important;
            }

            .attributes_content,
            .discount {
                background-color: #222 !important;
            }

            .email-masthead_name {
                text-shadow: none !important;
            }
        }

        :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
        }
    </style>
    <!--[if mso]>
    <style type="text/css">
      .f-fallback  {
        font-family: Arial, sans-serif;
      }
    </style>
  <![endif]-->
</head>

<body>
    <div class="logo">
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
            viewBox="0 0 956.000000 364.000000" preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,364.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M8979 3285 c-3 -2 -70 -17 -149 -33 -139 -28 -145 -30 -148 -55 -3
       -24 0 -26 54 -33 40 -5 65 -14 81 -30 l23 -23 0 -329 0 -330 -37 9 c-100 23
       -233 4 -341 -49 -67 -32 -173 -128 -209 -189 -84 -143 -84 -342 0 -485 36 -61
       118 -135 185 -166 105 -48 177 -35 350 67 l52 31 0 -64 0 -65 43 15 c24 8 93
       25 153 38 l109 22 3 32 3 32 -49 0 c-34 0 -57 6 -73 19 l-24 19 -3 786 c-1
       432 -6 786 -11 786 -4 0 -10 -2 -12 -5z m-263 -910 c27 -8 66 -28 87 -46 l37
       -31 -2 -281 -3 -282 -56 -28 c-31 -16 -81 -31 -112 -34 -48 -5 -64 -2 -111 21
       -68 33 -128 100 -158 175 -29 75 -32 259 -5 337 49 142 182 211 323 169z" />
                <path d="M1123 2855 c-25 -17 -30 -40 -12 -50 5 -4 39 -8 75 -9 45 -1 68 -6
       74 -16 6 -8 10 -137 10 -292 l0 -278 -474 0 c-369 0 -476 -3 -484 -13 -15 -17
       -28 -252 -14 -261 20 -12 39 5 52 47 7 23 21 59 31 79 36 70 19 68 459 68 217
       0 401 -4 408 -9 10 -6 12 -70 10 -312 l-3 -304 -32 -65 c-38 -76 -107 -160
       -132 -160 -12 0 -80 92 -205 276 -104 151 -191 284 -193 295 -11 42 86 108
       135 92 69 -21 96 -62 113 -175 17 -114 22 -122 70 -114 51 8 87 26 119 61 21
       22 25 36 25 89 0 53 -4 68 -27 98 -49 64 -176 108 -308 108 -215 0 -367 -114
       -433 -325 -25 -80 -29 -144 -14 -231 41 -227 201 -356 442 -356 158 0 261 47
       379 173 l66 69 0 -220 c0 -280 10 -265 -187 -286 -52 -5 -63 -9 -63 -24 0 -10
       7 -21 16 -24 20 -8 688 -8 708 0 9 3 16 14 16 24 0 15 -11 19 -62 24 -116 12
       -139 18 -166 41 l-27 23 -3 251 -3 251 53 0 c148 2 390 21 442 35 153 41 272
       129 328 242 40 82 50 201 23 282 -21 63 -87 138 -154 174 -41 23 -156 56 -196
       57 -5 0 19 17 54 38 124 73 195 181 195 297 0 146 -98 262 -267 318 -57 18
       -94 20 -442 24 -340 4 -382 3 -402 -12z m647 -115 c136 -22 185 -50 226 -130
       27 -53 25 -182 -3 -236 -55 -105 -155 -146 -385 -159 l-118 -7 0 265 c0 244 1
       266 18 270 33 9 198 7 262 -3z m198 -665 c65 -20 123 -74 140 -131 6 -23 12
       -72 12 -110 0 -154 -102 -261 -276 -293 -61 -12 -312 -15 -338 -5 -14 5 -16
       39 -16 278 0 150 3 276 8 281 14 14 412 -2 470 -20z m-1144 -593 c91 -133 166
       -249 166 -257 0 -24 -42 -39 -111 -38 -129 1 -223 85 -264 237 -31 114 -7 354
       31 314 6 -7 87 -122 178 -256z" />
                <path d="M3050 2842 c0 -29 2 -30 63 -41 78 -13 103 -39 112 -113 9 -77 1
       -980 -9 -1001 -12 -25 -59 -47 -117 -54 -46 -5 -49 -8 -49 -34 l0 -29 308 0
       c275 0 317 2 386 20 156 40 272 130 316 248 28 73 24 186 -8 248 -40 79 -138
       146 -256 175 l-49 12 52 19 c75 28 155 106 181 176 27 71 24 166 -8 228 -32
       62 -104 120 -181 146 -61 20 -89 22 -403 26 l-338 4 0 -30z m637 -80 c79 -41
       123 -119 123 -218 0 -70 -16 -119 -53 -161 -51 -58 -104 -76 -240 -81 l-118
       -5 3 228 3 227 25 20 c22 18 36 20 120 16 72 -3 105 -9 137 -26z m25 -571
       c119 -46 174 -139 166 -280 -7 -119 -58 -196 -163 -242 -40 -18 -69 -23 -142
       -23 -162 -1 -171 18 -172 353 l-1 223 128 -4 c99 -4 139 -10 184 -27z" />
                <path d="M7335 2459 c-22 -10 -84 -29 -137 -41 -93 -21 -98 -23 -98 -48 0 -21
       7 -27 47 -40 32 -10 52 -23 60 -40 9 -18 13 -103 13 -311 0 -274 -1 -287 -21
       -312 -15 -20 -33 -28 -70 -33 -46 -6 -49 -8 -49 -35 l0 -29 215 0 215 0 0 30
       c0 25 -4 30 -24 30 -52 0 -85 20 -96 58 -5 21 -10 152 -10 299 l0 261 59 40
       c70 47 143 67 203 57 54 -9 111 -64 127 -120 15 -56 15 -516 -1 -550 -8 -17
       -24 -29 -52 -36 -23 -6 -47 -13 -53 -15 -7 -2 -13 -15 -13 -29 l0 -25 210 0
       210 0 0 30 c0 25 -4 30 -24 30 -36 0 -84 20 -92 38 -4 9 -10 150 -13 312 l-6
       295 -28 58 c-44 88 -120 136 -218 137 -64 0 -115 -20 -204 -80 -109 -74 -104
       -74 -107 12 l-3 75 -40 -18z" />
                <path d="M4585 2457 c-75 -25 -130 -60 -186 -118 -109 -111 -163 -278 -141
       -432 29 -197 145 -325 325 -358 57 -11 75 -10 132 6 76 20 161 73 225 139 l44
       46 -21 21 -21 22 -34 -26 c-129 -99 -297 -90 -398 19 -54 58 -80 123 -87 210
       l-6 71 149 7 c82 4 203 11 269 17 146 12 161 22 152 106 -11 105 -78 203 -171
       250 -61 31 -169 40 -231 20z m112 -78 c15 -6 39 -20 52 -32 55 -51 81 -166 42
       -187 -12 -6 -92 -10 -190 -10 -193 0 -184 -5 -152 80 48 127 148 187 248 149z" />
                <path d="M6398 2451 c-172 -56 -280 -181 -316 -364 -20 -101 -8 -197 36 -291
       126 -270 473 -337 688 -134 101 96 145 202 145 353 1 202 -100 360 -271 427
       -78 30 -206 34 -282 9z m188 -75 c110 -51 174 -197 174 -398 0 -248 -78 -366
       -236 -356 -137 9 -228 131 -254 343 -24 193 34 360 142 414 56 27 111 27 174
       -3z" />
                <path d="M5067 2443 c-4 -3 -7 -16 -7 -29 0 -18 7 -23 42 -29 69 -12 95 -48
       183 -255 116 -276 197 -490 203 -537 4 -35 -4 -59 -52 -158 -49 -103 -64 -125
       -131 -188 -62 -59 -75 -77 -75 -103 0 -66 121 -125 161 -78 8 9 30 67 49 128
       l36 111 427 3 427 2 0 -299 0 -299 -66 -42 c-36 -23 -69 -40 -74 -38 -10 4
       -263 368 -258 373 33 28 95 32 138 10 31 -16 38 -33 42 -100 3 -40 3 -40 42
       -38 114 7 114 144 1 202 -39 21 -62 25 -129 25 -103 0 -170 -23 -232 -77 -64
       -56 -94 -123 -94 -209 0 -176 116 -298 301 -315 72 -7 145 10 239 56 41 20 78
       37 83 39 4 2 7 -71 7 -162 l0 -166 65 0 65 0 0 520 0 520 525 0 525 0 0 -130
       0 -130 -232 0 c-128 0 -243 -3 -255 -6 -17 -5 -23 -14 -23 -33 0 -20 15 -40
       59 -79 80 -70 113 -138 118 -241 5 -91 -12 -127 -73 -156 -84 -40 -224 15
       -307 119 -38 48 -137 237 -137 263 0 22 -36 34 -66 23 -24 -9 -26 -14 -21 -48
       4 -20 31 -87 61 -148 71 -143 164 -247 264 -296 61 -30 75 -33 157 -32 73 0
       99 4 138 23 59 29 103 81 122 145 34 112 9 192 -90 294 l-71 72 178 0 178 0 0
       -340 0 -340 75 0 75 0 0 520 0 520 145 0 145 0 0 -520 0 -520 75 0 75 0 0 520
       0 520 294 0 c252 0 297 -2 310 -15 42 -43 61 -220 30 -293 -19 -46 -57 -87
       -96 -103 -30 -12 -32 -11 -72 35 -35 41 -47 49 -86 52 -56 6 -89 -11 -114 -58
       -20 -35 -20 -36 -1 -99 22 -70 93 -176 188 -279 73 -80 272 -263 309 -284 24
       -15 28 -15 42 0 9 8 16 24 16 34 0 11 -53 77 -117 147 -112 123 -176 209 -222
       301 -16 31 -18 43 -9 46 155 42 196 64 260 135 89 99 92 233 7 352 l-20 29 86
       0 c79 0 88 -2 110 -26 13 -14 34 -59 46 -99 22 -71 39 -92 61 -79 10 6 3 227
       -8 267 -5 16 -100 17 -1805 17 -989 0 -1799 2 -1799 5 0 13 327 820 356 878
       37 72 70 100 130 112 30 5 34 10 34 35 l0 30 -185 0 -185 0 0 -29 c0 -25 5
       -30 33 -36 53 -11 77 -32 77 -65 0 -26 -49 -170 -151 -447 -13 -35 -26 -63
       -29 -63 -7 0 -183 442 -200 499 -10 37 9 67 50 76 25 5 30 11 30 36 l0 29
       -198 0 c-109 0 -202 -3 -205 -7z m918 -1682 c58 -84 104 -156 100 -159 -11
       -12 -102 -4 -131 11 -66 34 -104 104 -104 190 0 66 10 119 21 115 4 -2 56 -72
       114 -157z" />
            </g>
        </svg>
    </div>
    <span class="preheader">Use this link to reset your password. The link is only valid for 24 hours.</span>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td align="center">
                <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                        <td class="email-masthead">

                        </td>
                    </tr>
                    <!-- Email Body -->
                    <tr>
                        <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                            <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0"
                                role="presentation">
                                <!-- Body content -->
                                <tr>
                                    <td class="content-cell">
                                        <div class="f-fallback">
                                            <h1>Hi ${name},</h1>
                                            <p>You recently requested to reset your password for your BeyondBazaar
                                                account. Use the button below to reset it. <strong>This password reset
                                                    is only valid for the next 24 hours.</strong></p>
                                            <!-- Action -->
                                            <table class="body-action" align="center" width="100%" cellpadding="0"
                                                cellspacing="0" role="presentation">
                                                <tr>
                                                    <td align="center">
                                                        <!-- Border based button
           https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design -->
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                                            role="presentation">
                                                            <tr>
                                                                <td align="center">
                                                                    <a href="${url}"
                                                                        class="f-fallback button button--green"
                                                                        target="_blank">Reset your password</a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <p>If you did not request a password reset, please ignore this email or <a
                                                    href="{{support_url}}">contact support</a> if you have questions.
                                            </p>
                                            <p>Thanks,
                                                <br>The BeyondBazar team
                                            </p>
                                            <!-- Sub copy -->
                                            <table class="body-sub" role="presentation">
                                                <tr>
                                                    <td>
                                                        <p class="f-fallback sub">If you’re having trouble with the
                                                            button above, copy and paste the URL below into your web
                                                            browser.</p>
                                                        <p class="f-fallback sub">${url}</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0"
                                role="presentation">
                                <tr>
                                    <td class="content-cell" align="center">
                                        <p class="f-fallback sub align-center">
                                            Beyond Bazar
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
`
  return ResetPassword;
};
