

function checkField() {

	var val = document.getElementById("keyInput").value;
	// hash = hashpw(val, "$2a$04$jI1vN672jQsWJxTfl2.Ytu", result, null);

    checkpw(val, "$2a$04$jI1vN672jQsWJxTfl2.YtufzZE7aGt.qknAC3CoYSFxZMtw3QE8jS", function(res) {
            if(res) location.href = "/secret/engaged"; }, null);
    checkpw(val, "$2a$04$jI1vN672jQsWJxTfl2.YtuQ8fzrYB5VWD4CVv3l.CcolO.weF0any", function(res) {
            if(res) location.href = "/secret/cmpsci_resources/"; }, null);
    checkpw(val, "$2a$04$jI1vN672jQsWJxTfl2.YtuQp4O6XEEAHtogJLNUokw5K5NxOn/yWC", function(res) {
            if(res) location.href = "/secret/wedding"; }, null);
    checkpw(val, "$2a$04$jI1vN672jQsWJxTfl2.Ytup0QoGxBI/zBBzty2RN9rPmzpDNIKJS6", function(res) {
            if(res) location.href = "https://forms.gle/rQvEK1wWvxXcGkTK6"; }, null);

}