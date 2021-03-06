/*!
 * Tiktok++ v1.4.0
 * Copyright 20021-2021 The Tiktok++ Authors
 * Copyright 2021-2021 TikTok, Inc.
 * Licensed under MIT (https://github.com/gamerboytr/Tiktok-Plus-Plus/blob/master/LICENSE)
 */
"use strict";
$(function () {
	//! Fonksiyonlar
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	//! Tanımlamalar
	const version = "1.4.0";
	let darkmode = getCookie("mode"),
		recommendeds = getCookie("recommendeds"),
		thisUrl = window.location.href;
	//! Aktif Olup Olmadığını Kontrol Etme
	chrome.storage.sync.get(["active"], (result) => {
		if (result.active === "yes") {
			//? Log
			console.log("Tiktok++ Has Injected");
			$("html").addClass("plusplus");
			//! CSS
			$("head").prepend("<!-- Code Injected By Tiktok++ --><style>.tiktokplusplus-option i{margin-right:5px}.tiktokplusplus-owner{color:yellow}.tiktokplusplus-staff{position:absolute}.tiktokplusplus-dearmember{color:#2780e6}</style>");
			$("head").prepend('<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@0ac23ca/css/all.css" />');
			//! Kod İşlemleri
			setInterval(() => {
				if (
					!$(".copyright")
						.text()
						.match(/(T|t)ik(T|t)ok\+\+/g)
				) {
					$(".copyright").text($(".copyright").text().replaceAll("TikTok", "TikTok++"));
				}
			}, 1);
			setInterval(() => {
				//! Windown Location Change
				if (thisUrl !== window.location.href) {
					//! Yorumlarda Arama
					if ($(".jsx-3748520549.video-infos-container")) {
						$(".jsx-3748520549.video-infos-container .copy-link-container").after(`<div class="searchCommentsWrapper" style="text-align:center;">
				<div class="input">
				<input type="text" class="form-control" id="searchCommentsInput" autocomplete="off" placeholder="Yorumlarada Ara.."/>
				</div>
				</div>`);
					}
					$("#searchCommentsInput").on("input", (e) => {
						let txtValue, input, filter, li, a, i;
						input = document.getElementById("searchCommentsInput");
						filter = input.value.toUpperCase();
						li = document.querySelectorAll(".comments .comment-item");
						for (i = 0; i < li.length; i++) {
							a = li[i].querySelectorAll(".comment-text>span")[0];
							txtValue = a.textContent || a.innerText;
							if (txtValue.toUpperCase().indexOf(filter) > -1) {
								li[i].style.display = "";
							} else {
								li[i].style.display = "none";
							}
						}
					});
					//? Endİf
					//! Avatar
					$(".tiktok-avatar.tiktok-avatar-circle.avatar").on("click", () => {
						let avatarDiv = $(".image-wrap.big.user-page-header .tiktok-avatar.tiktok-avatar-circle.avatar");
						let avatarUrl = $(avatarDiv).children("img").attr("src");
						window.open(avatarUrl, "_blank");
					});
					//? Endİf
					thisUrl = window.location.href;
				}
			}, 1);
			//! Seçenekler Dropdown
			$(".jsx-2570553545.icon-wrap.avatar").hover((e) => {
				if (!document.querySelector(".jsx-2570553545 .jsx-2570553545.option.premium")) {
					$(".jsx-2570553545.header-setting-wrap .jsx-2570553545 .feedback").parent().after(`<hr class="jsx-2570553545 logout-line">
					<div style="text-align: center;line-hegiht:.5rem;font-weight:bold">TikTok++</div>
					<div class="jsx-2570553545">
					<a class="jsx-2570553545 option premium" title="Çok Yakında"><i class="jsx-2570553545"><i class="fas fa-gem"></i></i>TikTok Premium</a>
				</div>
				`);
				}
			});
			//? Endİf
			//! Ayarlar
			if (window.location.href.match(/https?:\/\/(www\.)?tiktok\.com\/settings?/g)) {
				$(".jsx-855016746.row-nav-scroll").append(`<hr><h3 style="text-align:center;color:#6c757d!important;">Tiktok++</h3>
				<div class="jsx-855016746 row-layout-nav-item tiktokplusplus-option" id="darkmode-swicth">
				<i class="fad fa-moon" style="font-size:1.2em"></i>
				<span class="jsx-1166966984" style="width:14em">Dark Mode</span>
<div class="jsx-1459454991"><div class="jsx-162805733 switch-container"><div class="jsx-162805733 switch"></div></div></div>
</div>
<div class="jsx-855016746 row-layout-nav-item tiktokplusplus-option" id="closeRecommendeds-swicth">
<i class="fas fa-user-alt" style="font-size:1.2em"></i>
<span class="jsx-1166966984" style="width:14em">Önerilenler Kısmını Kapat</span>
<span class="jsx-1166966984 description text-muted" style="font-size:13px;position:absolute;margin-bottom:-7px;margin-left:23px">Yan Kısımda Bulunan Önerilenler Kısmını Kapatır</span>
<div class="jsx-1459454991"><div class="jsx-162805733 switch-container"><div class="jsx-162805733 switch"></div></div></div>
</div>`);
			}
			//? Endİf

			//! Güncelleme Kontrol
			$.post("https://www.gamerboytr.ml/TiktokPlusPlus/index.php", "version", (data) => {
				data = JSON.parse(data);
				if (data["version"].replaceAll(".", "") > version.replaceAll(".", "")) {
					$("body").prepend(`<div class="modal fade" id="updateTiktokPlusPlus" tabindex="-1">
			<div class="modal-dialog" style="transform: none">
				<div class="modal-content">
						<div class="modal-header">
						<h2 class="modal-title">Tiktok++ Güncelleme Yardımcısı</h2>
						</div>
						<div class="modal-body">
						<p>Oh, Görnüşe Göre Yeni Bir Güncelleme Var!</p>
						<p>Değişiklikler :</p>
						<p>${data["changelog"]}<p>
						</div>
					<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hayır, Güncellemek İstemiyorum</button>
					<button type="button" class="btn btn-primary">Tamam</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-backdrop fade show" id="updateTiktokPlusPlusBackdrop"></div>`);
					$("#updateTiktokPlusPlus .btn-secondary").click(() => {
						$("#updateTiktokPlusPlusBackdrop").remove();
					});
					$("#updateTiktokPlusPlus .btn-primary").click(() => {
						let a = document.createElement("a");
						a.setAttribute("download", "Tiktok-Plus-Plus");
						a.setAttribute("href", "https://github.com/gamerboytr/Tiktok-Plus-Plus/archive/refs/heads/main.zip");
						a.click();
						a.remove();
						$("#updateTiktokPlusPlus").remove();
						$("#updateTiktokPlusPlusBackdrop").remove();
					});
					let updateModal = new bootstrap.Modal(document.getElementById("updateTiktokPlusPlus"), {
						keyboard: false,
						focus: false,
						backdrop: false,
					});
					updateModal.show();
					setTimeout(() => {
						$("#updateTiktokPlusPlus").css("opacity", "1");
						$("#updateTiktokPlusPlusBackdrop").css("opacity", ".5");
					}, 2000);
				}
				if (data["version"].replaceAll(".", "") < version.replaceAll(".", "")) {
					let msg = "Tiktok++ Bir Hata İle Karşılaştı lütfen daha sonra tekrar deneyin";
					alert(msg);
					throw new Error(msg);
				}
			});
			//! Reklam
			setInterval(() => {
				$.each(Admins, (key, val) => {
					let regex = new RegExp("tiktok.com/@" + val["username"], "g");
					if (window.location.href.match(regex)) {
						if (!$(".tiktokplusplus-staff").length) {
							$(".share-title-container .share-sub-title").after('<div class="tiktokplusplus-staff tiktokplusplus-' + val["perm_level"] + '">' + val["perm_name"] + "</div>");
							$(".share-title-container .share-follow-container").css("margin-top", "23px");
						}
					}
				});
			}, 1000);
			$("#darkmode-swicth").click((e) => {
				$("#darkmode-swicth .jsx-162805733.switch-container").toggleClass("on");
				if (getCookie("mode") === "dark") {
					setCookie("mode", "white", 99999);
					$("html").removeClass("darkmode");
					alert("Dark Mode DeAktif");
				} else {
					setCookie("mode", "dark", 99999);
					$("html").addClass("darkmode");
					alert("Dark Mode Aktif");
				}
			});
			$("#closeRecommendeds-swicth").click((e) => {
				if (getCookie("recommendeds") === "off") {
					setCookie("recommendeds", "on", 99999);
					alert("Önerilenler Başarıyla Açıldı");
					1;
				} else {
					setCookie("recommendeds", "off", 99999);
					alert("Önerilenler Başarıyla Kapatıldı");
				}
				$("#closeRecommendeds-swicth .jsx-162805733.switch-container").toggleClass("on");
			});
			if (recommendeds === "off") {
				setInterval(() => {
					$(".jsx-662949185.user-list.hidden-bottom-line").remove();
				}, 1000);
				$("#closeRecommendeds-swicth .jsx-162805733.switch-container").addClass("on");
			}
			//! Logo To Svg
			$(".jsx-3359950850.logo-link")
				.attr("title", "Tiktok++")
				.prepend(
					'<svg width="118" height="42" viewBox="0 0 118 42" fill="none" class="jsx-3359950850 logo-icon"><path d="M9.87537 16.842V15.7233C9.49211 15.6721 9.10246 15.6401 8.70003 15.6401C3.90288 15.6338 0 19.5399 0 24.3475C0 27.2947 1.46917 29.9031 3.71764 31.4822C2.26763 29.9287 1.37974 27.8381 1.37974 25.5494C1.37974 20.8121 5.17403 16.9507 9.87537 16.842Z" fill="#25F4EE"/><path d="M10.0862 29.5259C12.2261 29.5259 13.9763 27.819 14.053 25.6965L14.0594 6.72822H17.5215C17.4512 6.33824 17.4129 5.93548 17.4129 5.52632H12.686L12.6796 24.4946C12.603 26.6171 10.8527 28.324 8.71286 28.324C8.04854 28.324 7.42255 28.1578 6.86682 27.8637C7.58224 28.8674 8.75758 29.5259 10.0862 29.5259Z" fill="#25F4EE"/><path d="M23.9923 13.166V12.1112C22.6701 12.1112 21.4436 11.7212 20.4088 11.0435C21.3286 12.0984 22.5742 12.8656 23.9923 13.166Z" fill="#25F4EE"/><path d="M20.4088 11.0435C19.3995 9.88639 18.7927 8.37762 18.7927 6.72821H17.528C17.8537 8.53106 18.9269 10.0782 20.4088 11.0435Z" fill="#FE2C55"/><path d="M8.70642 20.3646C6.51544 20.3646 4.73328 22.1483 4.73328 24.3411C4.73328 25.8691 5.602 27.1988 6.86676 27.8637C6.39408 27.2116 6.11302 26.4125 6.11302 25.543C6.11302 23.3502 7.89518 21.5665 10.0862 21.5665C10.495 21.5665 10.891 21.6368 11.2615 21.7519V16.9188C10.8782 16.8676 10.4886 16.8356 10.0862 16.8356C10.0159 16.8356 9.95202 16.842 9.88175 16.842V20.55C9.50488 20.4349 9.11523 20.3646 8.70642 20.3646Z" fill="#FE2C55"/><path d="M23.9921 13.166V16.842C21.5392 16.842 19.2652 16.0557 17.4127 14.7259V24.3475C17.4127 29.1487 13.5099 33.0613 8.70631 33.0613C6.85388 33.0613 5.12921 32.4731 3.71753 31.4822C5.30806 33.1891 7.57569 34.2632 10.0861 34.2632C14.8832 34.2632 18.7925 30.357 18.7925 25.5494V15.9278C20.6449 17.2576 22.9189 18.0439 25.3718 18.0439V13.3131C24.8927 13.3131 24.4328 13.2619 23.9921 13.166Z" fill="#FE2C55"/><path d="M17.4127 24.3475V14.7259C19.2652 16.0557 21.5392 16.842 23.9921 16.842V13.166C22.574 12.8656 21.3284 12.0984 20.4086 11.0435C18.9266 10.0782 17.8599 8.53106 17.5213 6.72821H14.0592L14.0528 25.6964C13.9762 27.8189 12.2259 29.5259 10.0861 29.5259C8.75742 29.5259 7.58847 28.8674 6.86028 27.8701C5.59551 27.1988 4.72679 25.8755 4.72679 24.3475C4.72679 22.1547 6.50895 20.371 8.69993 20.371C9.10874 20.371 9.50478 20.4413 9.87527 20.5564V16.8484C5.17393 16.9507 1.37964 20.8121 1.37964 25.5494C1.37964 27.8381 2.26753 29.9223 3.71753 31.4822C5.12921 32.4731 6.85389 33.0613 8.70632 33.0613C13.5035 33.0613 17.4127 29.1487 17.4127 24.3475Z" fill="black"/><path d="M30.0477 13.1787H44.8225L43.4683 17.411H39.6357V33.0548H34.8577V17.411L30.0541 17.4173L30.0477 13.1787Z" fill="black"/><path d="M69.0317 13.1787H84.1514L82.7972 17.411H78.6261V33.0548H73.8417V17.411L69.0381 17.4173L69.0317 13.1787Z" fill="black"/><path d="M45.7295 19.5015H50.4628V33.0548H45.755L45.7295 19.5015Z" fill="black"/><path d="M52.347 13.1277H57.0802V22.3848L61.7688 17.7754H67.4155L61.4814 23.5356L68.1246 33.0548H62.9122L58.4791 26.4572L57.0739 27.8189V33.0548H52.3406V13.1277H52.347Z" fill="black"/><path d="M102.49 13.1277H107.224V22.3848L111.912 17.7754H117.559L111.625 23.5356L118.268 33.0548H113.062L108.629 26.4572L107.224 27.8189V33.0548H102.49V13.1277Z" fill="black"/><path d="M48.0929 17.9544C49.4088 17.9544 50.4755 16.8867 50.4755 15.5697C50.4755 14.2528 49.4088 13.1851 48.0929 13.1851C46.7771 13.1851 45.7103 14.2528 45.7103 15.5697C45.7103 16.8867 46.7771 17.9544 48.0929 17.9544Z" fill="black"/><path d="M83.5445 24.942C83.5445 20.6779 86.8342 17.1808 91.0181 16.8548C90.8073 16.8356 90.5199 16.8292 90.3091 16.8292C85.8313 16.8292 82.2031 20.4605 82.2031 24.942C82.2031 29.4236 85.8313 33.0548 90.3091 33.0548C90.5199 33.0548 90.8073 33.042 91.0181 33.0293C86.8406 32.7032 83.5445 29.2062 83.5445 24.942Z" fill="#25F4EE"/><path d="M92.8579 16.8292C92.6407 16.8292 92.3532 16.842 92.1425 16.8548C96.32 17.1808 99.6097 20.6779 99.6097 24.942C99.6097 29.2062 96.32 32.7032 92.1425 33.0293C92.3532 33.0484 92.6407 33.0548 92.8579 33.0548C97.3356 33.0548 100.964 29.4236 100.964 24.942C100.964 20.4605 97.3356 16.8292 92.8579 16.8292Z" fill="#FE2C55"/><path d="M91.5803 28.8866C89.4021 28.8866 87.6391 27.1221 87.6391 24.942C87.6391 22.762 89.4021 20.9975 91.5803 20.9975C93.7585 20.9975 95.5215 22.762 95.5215 24.942C95.5215 27.1221 93.7522 28.8866 91.5803 28.8866ZM91.5803 16.8292C87.1026 16.8292 83.4744 20.4605 83.4744 24.942C83.4744 29.4236 87.1026 33.0548 91.5803 33.0548C96.0581 33.0548 99.6863 29.4236 99.6863 24.942C99.6863 20.4605 96.0581 16.8292 91.5803 16.8292Z" fill="black"/></svg>'
				)
				.children("img")
				.remove();
			//! DarkMode Kontrol
			if (darkmode === "dark") {
				$("#darkmode-swicth .jsx-162805733.switch-container").addClass("on");
				$("html").addClass("darkmode");
				$(".message-icon.jsx-1461660784").css("background-image", "url('https://gamerboytr.github.io/Tiktok-Plus-Plus/src/svg/message-icon.svg')");
			}
		} else {
			console.log("Tiktok++ Durduruldu");
		}
	});
});
