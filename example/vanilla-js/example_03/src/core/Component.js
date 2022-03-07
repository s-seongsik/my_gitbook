export default class Components {
    $target;
    $state;
    constructor($target) {
        this.$target = $target;
        this.setup();
        this.render();
    }
    setup() {};
    template () { return ''; }
    render() {
        this.$target.innerHTML = this.template();
        this.setEvent();
    }
    setEvent () {}
    setState (newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
      }
}