import leafPatternMobile from "../../assets/images/leaf-pattern-mobile.png";
import leafPatternDesktop from "../../assets/images/leaf-pattern-desktop.png";

function LeafPattern() {
  return (
    <div className="w-full overflow-hidden" aria-hidden="true">
      <img
        src={leafPatternMobile}
        alt=""
        className="block md:hidden w-full h-auto object-cover"
      />
      <img
        src={leafPatternDesktop}
        alt=""
        className="hidden md:block w-full h-auto object-cover"
      />
    </div>
  );
}

export default LeafPattern;